
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type, businessType, targetAudience } = await req.json()

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    let systemPrompt = ""
    let userPrompt = prompt

    switch (type) {
      case 'business_name':
        systemPrompt = "Generate a catchy, professional business name based on the description provided. Return only the business name, nothing else."
        break
      case 'tagline':
        systemPrompt = "Generate a compelling tagline or slogan for the business described. Keep it under 10 words and make it memorable. Return only the tagline, nothing else."
        break
      case 'description':
        systemPrompt = "Generate a professional business description that explains what the company does and its value proposition. Keep it between 50-150 words. Return only the description, nothing else."
        break
      case 'features':
        systemPrompt = "Generate a list of 4-6 key features or benefits for the business described. Return as a JSON array of strings, each feature should be 2-5 words. Example: [\"24/7 Support\", \"Easy Integration\", \"Advanced Analytics\"]"
        break
      case 'complete_landing_page':
        systemPrompt = `Generate complete landing page content including business name, tagline, description, and features. 
        Business type: ${businessType || 'general business'}
        Target audience: ${targetAudience || 'general audience'}
        
        Return as JSON with this exact structure:
        {
          "business_name": "string",
          "tagline": "string (under 10 words)",
          "description": "string (50-150 words)", 
          "features": ["feature1", "feature2", "feature3", "feature4"]
        }`
        break
      default:
        systemPrompt = "Generate relevant content for a landing page based on the user's request."
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser request: ${userPrompt}`
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No content generated from Gemini API')
    }

    let content = generatedText.trim()

    // For features type, try to parse as JSON
    if (type === 'features' || type === 'complete_landing_page') {
      try {
        content = JSON.parse(content)
      } catch (e) {
        // If JSON parsing fails for features, try to extract array manually
        if (type === 'features') {
          const lines = content.split('\n').filter(line => line.trim())
          content = lines.slice(0, 6) // Take up to 6 features
        }
      }
    }

    return new Response(
      JSON.stringify({ content }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in AI content generator:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
