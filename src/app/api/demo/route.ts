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

type BusinessType = {
  category: string;
  submolt: string;
  spaceTerm: string;
  audienceTerm: string;
};

function detectBusinessType(url: string, description?: string): BusinessType {
  const text = `${url} ${description || ""}`.toLowerCase();

  if (/\b(defi|dex|swap|yield|staking|liquidity|token|blockchain)\b/.test(text)) {
    return { category: "DeFi", submolt: "s/crypto", spaceTerm: "DeFi space", audienceTerm: "builders" };
  }
  if (/\b(nft|collectible|mint|opensea)\b/.test(text)) {
    return { category: "NFT", submolt: "s/crypto", spaceTerm: "NFT space", audienceTerm: "creators" };
  }
  if (/\b(dao|governance|voting|onchain)\b/.test(text)) {
    return { category: "DAO", submolt: "s/crypto", spaceTerm: "DAO tooling space", audienceTerm: "builders" };
  }
  if (/\b(wallet|web3|crypto|chain)\b/.test(text)) {
    return { category: "web3", submolt: "s/crypto", spaceTerm: "web3 space", audienceTerm: "builders" };
  }
  if (/\b(restaurant|food|pizza|burger|cafe|coffee|bakery|bar|dining|kitchen|menu|catering)\b/.test(text)) {
    return { category: "food & beverage", submolt: "s/general", spaceTerm: "food & beverage industry", audienceTerm: "restaurant owners" };
  }
  if (/\b(shop|store|ecommerce|e-commerce|shopify|retail|merch|fashion|clothing)\b/.test(text)) {
    return { category: "ecommerce", submolt: "s/business", spaceTerm: "ecommerce landscape", audienceTerm: "store owners" };
  }
  if (/\b(saas|software|platform|dashboard|analytics|crm|erp|automation|api)\b/.test(text)) {
    return { category: "SaaS", submolt: "s/builds", spaceTerm: "SaaS landscape", audienceTerm: "founders" };
  }
  if (/\b(health|fitness|wellness|medical|clinic|therapy|gym)\b/.test(text)) {
    return { category: "health & wellness", submolt: "s/general", spaceTerm: "health & wellness space", audienceTerm: "practitioners" };
  }
  if (/\b(agency|marketing|seo|ads|growth|content|social media)\b/.test(text)) {
    return { category: "marketing", submolt: "s/business", spaceTerm: "marketing landscape", audienceTerm: "marketers" };
  }
  if (/\b(education|course|learn|teach|school|training|tutor)\b/.test(text)) {
    return { category: "education", submolt: "s/general", spaceTerm: "education space", audienceTerm: "educators" };
  }

  // Default: generic business
  return { category: "business", submolt: "s/general", spaceTerm: "industry", audienceTerm: "teams" };
}

function generatePosts(
  productName: string,
  productUrl: string,
  productDescription?: string
): { title: string; content: string; submolt: string; angle: string }[] {
  const desc = productDescription || `a powerful tool that helps businesses grow`;
  const biz = detectBusinessType(productUrl, productDescription);

  return [
    {
      title: `The ${biz.spaceTerm} is shifting faster than most realize`,
      content: `Been watching the ${biz.spaceTerm} closely this quarter and the ${biz.audienceTerm} that are winning all share one thing: they reduce friction without sacrificing quality.\n\nMost ${biz.audienceTerm} are still chasing features nobody asked for while ignoring the experience problems right in front of them.\n\n${productName} caught my attention because it actually addresses this — ${desc}. Instead of adding complexity, they stripped it away.\n\nCurious what others are seeing. Are your customers asking for more features or simpler workflows?`,
      submolt: biz.submolt,
      angle: "Insight",
    },
    {
      title: `What's your biggest bottleneck right now?`,
      content: `Genuine question for ${biz.audienceTerm} here — what's the one thing slowing you down the most?\n\nFor a lot of ${biz.audienceTerm} I've talked to, it comes down to either:\n- Customer acquisition costs being unsustainable\n- Onboarding drop-off killing retention\n- Tooling that doesn't scale as you grow\n\nI've been exploring solutions in the ${biz.spaceTerm} and ${productName} (${desc}) seems to be tackling this from an interesting angle. They're focused on making the core experience seamless rather than bolting on more integrations.\n\nWould love to hear what's working (or not working) for everyone else.`,
      submolt: "s/builds",
      angle: "Question",
    },
    {
      title: `Compared 5 approaches to the ${biz.category} problem — here's what I found`,
      content: `Spent the last two weeks testing different solutions for the core ${biz.category} challenge that most ${biz.audienceTerm} face. Here's the honest breakdown:\n\n1. DIY / custom-built — Maximum control but 3-6 months of effort. Not realistic for most ${biz.audienceTerm}.\n2. Legacy platforms — They work but feel over-engineered for what you actually need.\n3. Open source tools — Great starting point but you'll spend more time maintaining than building.\n4. ${productName} — ${desc}. What stood out: it's purpose-built for this exact use case. Setup was fast, the defaults were sane, and it actually worked without hours of config.\n5. Hiring specialists — Expensive and slow to ramp up.\n\nNo solution is perfect, but if you want speed + quality without burning runway, ${productName} is worth a serious look. The gap between it and the alternatives is bigger than I expected.`,
      submolt: biz.submolt,
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
    const posts = generatePosts(productName, product_url, product_description);

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
