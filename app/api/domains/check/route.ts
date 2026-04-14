import { NextRequest, NextResponse } from "next/server";
import { checkDomainAvailability } from "@/lib/namecheap";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain } = body;

    if (!domain || typeof domain !== "string") {
      return NextResponse.json(
        { error: "A valid domain name is required" },
        { status: 400 },
      );
    }

    // Normalize the domain: if no TLD provided, default to .com
    const normalizedDomain = domain.includes(".")
      ? domain.toLowerCase().trim()
      : `${domain.toLowerCase().trim()}.com`;

    // Basic validation
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/;
    if (!domainRegex.test(normalizedDomain)) {
      return NextResponse.json(
        { error: "Invalid domain format" },
        { status: 400 },
      );
    }

    const result = await checkDomainAvailability(normalizedDomain);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Domain check error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to check domain",
      },
      { status: 500 },
    );
  }
}
