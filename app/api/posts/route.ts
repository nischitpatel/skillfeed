import { NextResponse } from "next/server";

const posts: any[] = [
    { "id": "1", "username": "AliceDev", "skill": "JavaScript", "content": "Mastering `Array.reduce()` is the key to cleaner data transformations.", "createdAt": "2025-12-27T17:17:33.926Z" },
    { "id": "2", "username": "BobPython", "skill": "Python", "content": "Use `pathlib` instead of `os.path` for more readable file system operations.", "createdAt": "2025-12-26T17:17:33.926Z" },
    { "id": "3", "username": "NextGenCoder", "skill": "Next.js", "content": "Next.js 15 Server Actions make handling form state incredibly seamless.", "createdAt": "2025-12-25T17:17:33.926Z" },
    { "id": "4", "username": "DesignQueen", "skill": "UI/UX", "content": "Consistency is key. Always define a 4pt or 8pt grid system for spacing.", "createdAt": "2025-12-24T17:17:33.926Z" },
    { "id": "5", "username": "NeuralNet", "skill": "AI Basics", "content": "LLMs aren't databases; they are reasoning engines. Think 'RAG' for data retrieval.", "createdAt": "2025-12-23T17:17:33.926Z" },
    { "id": "6", "username": "CharlieJS", "skill": "JavaScript", "content": "Optional chaining `?.` prevents so many 'undefined' crashes. Use it!", "createdAt": "2025-12-22T17:17:33.926Z" },
    { "id": "7", "username": "DataWhiz", "skill": "Python", "content": "Enumerate is better than range(len(x)). \n\n```python\nfor i, val in enumerate(list):\n```", "createdAt": "2025-12-21T17:17:33.926Z" },
    { "id": "8", "username": "VercelPro", "skill": "Next.js", "content": "Optimize your LCP by using the Next/Image component with the 'priority' prop.", "createdAt": "2025-12-20T17:17:33.926Z" },
    { "id": "9", "username": "PixelPerfect", "skill": "UI/UX", "content": "Dark mode shouldn't just be pure black. Use deep grays for better depth.", "createdAt": "2025-12-19T17:17:33.926Z" },
    { "id": "10", "username": "PromptMaster", "skill": "AI Basics", "content": "Zero-shot prompting vs Few-shot: Providing examples significantly boosts accuracy.", "createdAt": "2025-12-18T17:17:33.926Z" },
    { "id": "11", "username": "ScriptKid", "skill": "JavaScript", "content": "Always use `===` over `==` to avoid unexpected type coercion bugs.", "createdAt": "2025-12-17T17:17:33.926Z" },
    { "id": "12", "username": "SnakeCharmer", "skill": "Python", "content": "The `with` statement ensures files are closed properly even if errors occur.", "createdAt": "2025-12-16T17:17:33.926Z" },
    { "id": "13", "username": "StackSurfer", "skill": "Next.js", "content": "Incremental Static Regeneration (ISR) is a game changer for blogs.", "createdAt": "2025-12-15T17:17:33.926Z" },
    { "id": "14", "username": "UxExplorer", "skill": "UI/UX", "content": "Aria-labels are essential. If an icon doesn't have text, give it a label!", "createdAt": "2025-12-14T17:17:33.926Z" },
    { "id": "15", "username": "GptGuru", "skill": "AI Basics", "content": "Tokens aren't words. 1000 tokens is roughly 750 words on average.", "createdAt": "2025-12-13T17:17:33.926Z" },
    { "id": "16", "username": "EcmaExpert", "skill": "JavaScript", "content": "Nullish coalescing `??` is safer than `||` when checking for 0 or empty strings.", "createdAt": "2025-12-12T17:17:33.926Z" },
    { "id": "17", "username": "PyScientist", "skill": "Python", "content": "Pandas `.iloc` vs `.loc`: iloc is integer-based, loc is label-based.", "createdAt": "2025-12-11T17:17:33.926Z" },
    { "id": "18", "username": "FullStackSifu", "skill": "Next.js", "content": "Middleware in Next.js is perfect for authentication and bot protection.", "createdAt": "2025-12-10T17:17:33.926Z" },
    { "id": "19", "username": "FigmaFanatic", "skill": "UI/UX", "content": "Auto Layout in Figma is a must-learn for responsive design handoffs.", "createdAt": "2025-11-10T17:17:33.926Z" },
    { "id": "20", "username": "DeepLearner", "skill": "AI Basics", "content": "Vector databases like Pinecone are essential for scaling AI memory.", "createdAt": "2025-11-11T17:17:33.926Z" },
    { "id": "21", "username": "NodeNinja", "skill": "JavaScript", "content": "Use `Promise.allSettled` if you want to wait for all promises regardless of failure.", "createdAt": "2025-11-12T17:17:33.926Z" },
    { "id": "22", "username": "DjangoDev", "skill": "Python", "content": "Python's `f-strings` are faster and more readable than `.format()`.", "createdAt": "2025-11-13T17:17:33.926Z" },
    { "id": "23", "username": "ReactRacer", "skill": "Next.js", "content": "Partial Prerendering (PPR) is the future of hybrid web apps.", "createdAt": "2025-11-14T17:17:33.926Z" },
    { "id": "24", "username": "UserCentered", "skill": "UI/UX", "content": "Don't hide important actions behind a 'hamburger' menu on desktop.", "createdAt": "2025-11-15T17:17:33.926Z" },
    { "id": "25", "username": "OpenAI_Adopter", "skill": "AI Basics", "content": "Temperature 0 makes AI deterministic; 0.7-1.0 makes it creative.", "createdAt": "2025-11-16T17:17:33.926Z" },
    { "id": "26", "username": "AsyncAnnie", "skill": "JavaScript", "content": "Avoid the 'callback hell'. Refactor old code to use async/await.", "createdAt": "2025-11-17T17:17:33.926Z" },
    { "id": "27", "username": "PipInstaller", "skill": "Python", "content": "Keep your requirements.txt updated or use Poetry for dependency management.", "createdAt": "2025-11-18T17:17:33.926Z" },
    { "id": "28", "username": "RouterRigby", "skill": "Next.js", "content": "The `parallel routes` feature allows multiple pages in the same layout.", "createdAt": "2025-11-19T17:17:33.926Z" },
    { "id": "29", "username": "ColorCrafter", "skill": "UI/UX", "content": "Blue is the safest color for global accessibility in UI design.", "createdAt": "2025-11-20T17:17:33.926Z" },
    { "id": "30", "username": "AgenticAI", "skill": "AI Basics", "content": "AI Agents are just loops where the LLM decides the next tool to call.", "createdAt": "2025-11-21T17:17:33.926Z" },
    { "id": "31", "username": "ModernWeb", "skill": "JavaScript", "content": "ES Modules (`import/export`) are now standard across browsers and Node.", "createdAt": "2025-11-22T17:17:33.926Z" },
    { "id": "32", "username": "FastApiFred", "skill": "Python", "content": "FastAPI uses Pydantic for validation, making API docs automatic.", "createdAt": "2025-11-23T17:17:33.926Z" },
    { "id": "33", "username": "DeployDash", "skill": "Next.js", "content": "Vercel's Edge Network reduces latency by running code closer to users.", "createdAt": "2025-11-24T17:17:33.926Z" },
    { "id": "34", "username": "MotionMaker", "skill": "UI/UX", "content": "Micro-interactions provide immediate feedback and delight the user.", "createdAt": "2025-11-25T17:17:33.926Z" },
    { "id": "35", "username": "TuringTest", "skill": "AI Basics", "content": "The 'context window' determines how much history the AI can remember.", "createdAt": "2025-11-26T17:17:33.926Z" },
    { "id": "36", "username": "FrontEndFrank", "skill": "JavaScript", "content": "Stop using `var`. `let` and `const` provide block-scoping safety.", "createdAt": "2025-11-27T17:17:33.926Z" },
    { "id": "37", "username": "CypherSnake", "skill": "Python", "content": "Use `zip()` to iterate over two lists in parallel easily.", "createdAt": "2025-11-28T17:17:33.926Z" },
    { "id": "38", "username": "StaticSteve", "skill": "Next.js", "content": "Static Site Generation (SSG) is unbeatable for SEO-heavy pages.", "createdAt": "2025-11-29T17:17:33.926Z" },
    { "id": "39", "username": "ContrastClarity", "skill": "UI/UX", "content": "Check your UI with a grayscale filter to ensure visual hierarchy holds up.", "createdAt": "2025-11-30T17:17:33.926Z" },
    { "id": "40", "username": "ModelMaker", "skill": "AI Basics", "content": "Fine-tuning is for style/format; RAG is for facts/knowledge.", "createdAt": "2025-10-11T17:17:33.926Z" },
    { "id": "41", "username": "WebWorker", "skill": "JavaScript", "content": "Offload heavy computations to Web Workers to keep the UI thread smooth.", "createdAt": "2025-10-12T17:17:33.926Z" },
    { "id": "42", "username": "BackendBen", "skill": "Python", "content": "Decorators are a clean way to add logging or auth to functions.", "createdAt": "2025-10-13T17:17:33.926Z" },
    { "id": "43", "username": "TurboRepoTester", "skill": "Next.js", "content": "Monorepos with Turborepo speed up build times for large Next.js apps.", "createdAt": "2025-10-14T17:17:33.926Z" },
    { "id": "44", "username": "TypoTamer", "skill": "UI/UX", "content": "Line length should be 45-75 characters for optimal readability.", "createdAt": "2025-10-15T17:17:33.926Z" },
    { "id": "45", "username": "PromptEngineer", "skill": "AI Basics", "content": "Chain-of-Thought: Ask the AI to 'think step-by-step' for logic tasks.", "createdAt": "2025-10-16T17:17:33.926Z" },
    { "id": "46", "username": "ClosureCloud", "skill": "JavaScript", "content": "Closures allow functions to remember the environment they were created in.", "createdAt": "2025-10-17T17:17:33.926Z" },
    { "id": "47", "username": "PandasPete", "skill": "Python", "content": "Vectorized operations in NumPy are 100x faster than standard Python loops.", "createdAt": "2025-10-18T17:17:33.926Z" },
    { "id": "48", "username": "SeoSam", "skill": "Next.js", "content": "Use the Metadata API for dynamic OG tags and better social sharing.", "createdAt": "2025-10-19T17:17:33.926Z" },
    { "id": "49", "username": "IconicIda", "skill": "UI/UX", "content": "SVGs are always better than PNGs for icons. Scalability matters.", "createdAt": "2025-10-20T17:17:33.926Z" },
    { "id": "50", "username": "FutureFlow", "skill": "AI Basics", "content": "Multimodal AI can now process images, audio, and text simultaneously.", "createdAt": "2025-10-21T17:17:33.926Z" }
  ]; // TEMP (replace with DB)

export async function POST(req: Request) {
  const body = await req.json();

  const post = {
    id: crypto.randomUUID(),
    username: "user_1",
    skill: body.selectedSkill,
    type: body.postType,
    content: body.content,
    createdAt: new Date(),
  };

  console.log(post);

  posts.unshift(post);

  return NextResponse.json(post);
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const skill = searchParams.get("skill");

//   const filtered = skill
//     ? posts.filter(p => p.skill === skill)
//     : posts;

//   return NextResponse.json(filtered);
// }

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  
    const skill = searchParams.get("skill");
    const cursor = searchParams.get("cursor"); // ISO string
    const limit = Number(searchParams.get("limit") ?? 5);
  
    let data = posts;
  
    // Filter by skill
    if (skill) {
      data = data.filter(p => p.skill === skill);
    }
  
    // Sort newest → oldest
    data = data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  
    // Cursor filtering
    if (cursor) {
      data = data.filter(
        p => new Date(p.createdAt).getTime() < new Date(cursor).getTime()
      );
    }
  
    const page = data.slice(0, limit);
  
    const nextCursor =
      page.length > 0 ? page[page.length - 1].createdAt : null;
  
    return NextResponse.json({
      posts: page,
      nextCursor,
    });
  }
  