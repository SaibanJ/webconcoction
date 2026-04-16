import { NextRequest, NextResponse } from "next/server";
import { checkDomainAvailability } from "@/lib/namecheap";
import { z } from "zod";

const checkSchema = z.object({
  domain: z.string().min(1).max(253).transform((d) =>
    d.includes(".") ? d.toLowerCase().trim() : `${d.toLowerCase().trim()}.com`
  ).refine((d) => /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(d), {
    message: "Invalid domain format",
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || 'Invalid domain'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const normalizedDomain = parsed.data.domain

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
