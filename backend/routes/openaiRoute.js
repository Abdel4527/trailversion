const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const axios = require("axios");
const Product = require("../models/Product");

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Check if the prompt is related to products or general questions
    const isProductQuery =
      prompt.toLowerCase().includes("product") ||
      prompt.toLowerCase().includes("price") ||
      prompt.toLowerCase().includes("buy") ||
      prompt.toLowerCase().includes("sell");

    const isRecommendationQuery =
      prompt.toLowerCase().includes("recommend") ||
      prompt.toLowerCase().includes("suggest");

    if (isProductQuery || isRecommendationQuery) {
      console.log("Processing product-related query...");

      // Clean the prompt to extract meaningful keywords
      const cleanedPrompt = prompt
        .replace(/what|is|the|price|of|me|to|sell|under|dollars|for|below|less|than|over|and|or|$/gi, "")
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim();

      console.log("Cleaned Prompt:", cleanedPrompt);

      // Extract price range from the prompt
      const maxPriceMatch = prompt.match(/under (\d+)/i);
      const maxPrice = maxPriceMatch ? parseFloat(maxPriceMatch[1]) : null;

      // Build the query for the database
      const query = {};
      if (cleanedPrompt && cleanedPrompt !== "$50") {
        query.$or = [
          { name: { $regex: cleanedPrompt, $options: "i" } },
          { description: { $regex: cleanedPrompt, $options: "i" } },
          { category: { $regex: cleanedPrompt, $options: "i" } },
          { brand: { $regex: cleanedPrompt, $options: "i" } },
          { material: { $regex: cleanedPrompt, $options: "i" } },
        ];
      }
      if (maxPrice) {
        query.price = { $lte: maxPrice };
      }

      console.log("Database Query:", query);

      // Query the database for matching products
      const products = await Product.find(query).limit(5);

      if (products.length === 0) {
        console.log("No matching products found for:", cleanedPrompt);
        return res.json({
          answer: maxPrice
            ? `I'm sorry, we couldn't find any products matching "${cleanedPrompt}" under $${maxPrice}. Please try searching with different keywords or a higher price range.`
            : `I'm sorry, we couldn't find any products matching "${cleanedPrompt}". Please try searching with different keywords.`,
        });
      }

      // Format the response with detailed product information
      const productList = products
        .map((product, index) => {
          return `${index + 1}. **${product.name}**  
- **Price**: $${product.price}  
- **Category**: ${product.category}  
- **Brand**: ${product.brand}  
- **Material**: ${product.material}  
- **Sizes**: ${product.sizes.join(", ")}  
- **Colors**: ${product.colors.join(", ")}  
- **Description**: ${product.description}  
- **Images**: ${product.images.map((img) => img.url).join(", ")}`;
        })
        .join("\n\n");

      console.log("Formatted Product List:", productList);

      // Return the product list directly to the user
      return res.json({
        answer: maxPrice
          ? `Here are some products under $${maxPrice}:\n\n${productList}\n\nPlease note, prices may vary based on size, color, discounts, and sales events.`
          : `Here are some recommended products:\n\n${productList}\n\nPlease note, prices may vary based on size, color, discounts, and sales events.`,
      });
    }

    // Handle general questions using OpenAI
    console.log("Processing general question...");
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant capable of answering general questions and providing product recommendations.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    console.log("Full OpenAI Response:", response);
    const answer = response.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error("Error with OpenAI API or backend query:", error.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI or backend" });
  }
});

module.exports = router;