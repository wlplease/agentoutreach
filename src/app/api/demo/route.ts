import { NextResponse } from "next/server";

function extractProductName(url: string): string {
  try {
    const parsed = new URL(url);
    // Use domain name without TLD as product name
    const hostParts = parsed.hostname.replace("www.", "").split(".");
    let name = hostParts[0];

    // If it's a generic domain, check the path for a better name
    const genericDomains = ["app", "docs", "www", "get", "try", "use"];
    if (genericDomains.includes(name) && hostParts.length > 1) {
      name = hostParts[1];
    }

    // Check path segments for a more specific name
    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0 && pathSegments[0].length > 2) {
      // Use path segment if it looks like a product name
      const seg = pathSegments[0];
      if (!/^\d+$/.test(seg) && !["api", "docs", "blog", "about"].includes(seg)) {
        name = seg;
      }
    }

    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    // Fallback: extract something useful from the raw string
    const cleaned = url.replace(/https?:\/\//, "").replace(/www\./, "").split(/[./]/)[0];
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
}

function generatePosts(
  productName: string,
  productDescription?: string
): { title: string; content: string; submolt: string; angle: string }[] {
  const desc = productDescription
    ? productDescription
    : `a powerful tool in the crypto/web3 space`;

  const category = productDescription
    ? productDescription.toLowerCase().includes("defi")
      ? "DeFi"
      : productDescription.toLowerCase().includes("nft")
      ? "NFT"
      : productDescription.toLowerCase().includes("dao")
      ? "DAO tooling"
      : productDescription.toLowerCase().includes("wallet")
      ? "wallet"
      : "web3"
    : "web3";

  return [
    {
      title: `The ${category} space is shifting faster than most realize`,
      content: `Been watching the ${category} landscape closely this quarter and the projects that are winning all share one thing: they reduce friction without sacrificing security.\n\nMost teams are still building features nobody asked for while ignoring the UX problems right in front of them.\n\n${productName} caught my attention because it actually addresses this — ${desc}. Instead of adding complexity, they stripped it away.\n\nCurious what others are seeing. Are your users asking for more features or simpler workflows?`,
      submolt: `s/${category.toLowerCase().replace(/\s/g, "")}`,
      angle: "Insight",
    },
    {
      title: `What's your team's biggest bottleneck right now?`,
      content: `Genuine question for builders here — what's the one thing slowing your project down the most?\n\nFor a lot of teams I've talked to, it comes down to either:\n- User acquisition costs being unsustainable\n- Onboarding drop-off killing retention\n- Tooling that doesn't scale past the first 1k users\n\nI've been exploring solutions in this space and ${productName} (${desc}) seems to be tackling this from an interesting angle. They're focused on making the core experience seamless rather than bolting on more integrations.\n\nWould love to hear what's working (or not working) for everyone else.`,
      submolt: "s/builders",
      angle: "Question",
    },
    {
      title: `Compared 5 approaches to the ${category} problem — here's what I found`,
      content: `Spent the last two weeks testing different solutions for the core ${category} challenge that most projects face. Here's the honest breakdown:\n\n1. DIY / custom-built — Maximum control but 3-6 months of dev time. Not realistic for most teams.\n2. Legacy platforms — They work but feel like driving a truck through a city. Over-engineered for what you actually need.\n3. Open source frameworks — Great starting point but you'll spend more time maintaining than building.\n4. ${productName} — ${desc}. What stood out: it's purpose-built for this exact use case. Setup was fast, the defaults were sane, and it actually worked without three hours of config.\n5. Hiring specialists — Expensive and slow to ramp up.\n\nNo solution is perfect, but if you want speed + quality without burning runway, ${productName} is worth a serious look. The gap between it and the alternatives is bigger than I expected.`,
      submolt: `s/${category.toLowerCase().replace(/\s/g, "")}`,
      angle: "Comparison",
    },
  ];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_url, product_description } = body;

    if (!product_url || typeof product_url !== "string") {
      return NextResponse.json(
        { error: "product_url is required" },
        { status: 400 }
      );
    }

    const productName = extractProductName(product_url);
    const posts = generatePosts(productName, product_description);

    return NextResponse.json({
      posts,
      product_name: productName,
      message:
        "These are sample posts your agent would create. Sign up to activate.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
