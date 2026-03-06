export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const product = req.body;

  console.log("Product received:", product);

  res.status(200).json({
    success: true,
    message: "Product uploaded",
    product
  });
}
