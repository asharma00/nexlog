const blogsList = [
    {
        id: 1,
        title: 'How I Quit My 9-5 and Moved to a Cabin in the Woods',
        username: 'ecoElena',
        posted: '2 weeks ago',
        category: 'Technology',
        tags: ['Minimalism','Remote Living','Mental Health','Sustainable Life'],
        summary: 'After years of burnout, I finally traded city chaos for mountain silence. In this post, I break down how I planned the transition, what I didn’t expect, and how it’s changed my relationship with work and self.',
        blog: '<article><h3>“I don’t think I was meant for office life.”</h3><p>That’s the sentence I scribbled into my journal during yet another soul-crushing meeting in a beige, windowless boardroom. Fast forward 18 months, and I’m writing this from a small cedar cabin I built with my own hands in the Pacific Northwest.</p><p>This post isn’t about quitting your job overnight. It’s about listening to the quiet inner voice that whispers, <em>“There’s another way to live.”</em></p><hr><h3>Why I Left My Job</h3><p>I had a good job on paper—salary, benefits, career trajectory. But inside, I felt completely disconnected. I craved silence, simplicity, and a more intentional rhythm. The pandemic forced me to confront what I really wanted: peace, presence, and purpose.</p><hr><h3>The Transition Plan</h3><ol><li><strong>Downsizing</strong> – I sold half my belongings, donated the rest, and learned to live light.</li><li><strong>Savings cushion</strong> – I lived frugally for a year, saved enough for 12 months of bare-bones living.</li><li><strong>Remote income</strong> – I started freelance writing and offering sustainability consulting online.</li><li><strong>Location scouting</strong> – I researched and visited off-grid properties for six months before finding “the one.”</li></ol><hr><h3>Life Now</h3><p>There’s no traffic here. No rush. I wake with the sun, grow most of my own food, and spend more time outside than I ever did before. Do I miss city life? Sometimes. But nothing compares to the sense of freedom I feel now.</p><hr><h3>Final Thoughts</h3><p>Living simply doesn’t mean doing less—it means doing what matters more. If you feel the call to slow down, honor it. It might just be the start of your best chapter yet.</p></article>',
        likes: 5,
        comments: 2,
        shares: 3,
        profile: ''
    },
    {
        id: 2,
        title: "Top 10 JavaScript Tricks Every Developer Should Know in 2025",
        username: "codeWizardMark",
        posted: "3 days ago",
        category: 'Technology',
        tags: ["Web Development ", "JavaScript", "Coding Tips", "Frontend Dev"],
        summary: "JavaScript is ever-evolving. Here are ten powerful tricks and modern syntax patterns (including ES2025 updates) that can help you write cleaner and faster code.",
        blog: "<p>JavaScript continues to evolve rapidly, and with the latest updates in ES2025, there are even more tools available to write cleaner, faster, and more expressive code. Whether you're a beginner or a seasoned developer, these 10 tips will help you level up your JS game in 2025.</p>\n\n<h2>1. <code>do expressions</code> for inline logic</h2>\n<p>ES2025 introduces <code>do</code> expressions, letting you write multi-step logic inline:</p>\n<pre><code>const status = do {\n  if (score &gt; 90) 'Excellent';\n  else if (score &gt; 75) 'Good';\n  else 'Needs Improvement';\n};</code></pre>\n\n<h2>2. Top-level <code>await</code> in modules</h2>\n<p>No more wrapping async logic in functions — use <code>await</code> directly at the top level of ES modules:</p>\n<pre><code>const data = await fetchData();</code></pre>\n\n<h2>3. Logical assignment operators</h2>\n<p>Shorten conditional assignments with <code>&amp;&amp;=</code>, <code>||=</code>, and <code>??=</code>:</p>\n<pre><code>config.timeout ||= 5000; // Assign if falsy</code></pre>\n\n<h2>4. Private fields and methods</h2>\n<p>Use <code>#</code> to define private class members — enforced by the language:</p>\n<pre><code>class Counter {\n  #count = 0;\n  increment() { this.#count++; }\n}</code></pre>\n\n<h2>5. Nullish coalescing (<code>??</code>)</h2>\n<p>Handle default values safely without overriding <code>0</code> or empty strings:</p>\n<pre><code>const name = userInput ?? 'Guest';</code></pre>\n\n<h2>6. Optional chaining (<code>?.</code>)</h2>\n<p>Safely access deeply nested properties without boilerplate:</p>\n<pre><code>const zip = user?.address?.zipCode;</code></pre>\n\n<h2>7. Array <code>at()</code> method</h2>\n<p>Get array elements by index — including negative indexes:</p>\n<pre><code>const lastItem = items.at(-1);</code></pre>\n\n<h2>8. Record & Tuple (proposed)</h2>\n<p>These immutable value types are coming soon — similar to frozen objects and arrays but with identity:</p>\n<pre><code>const user = #{ name: 'Jane', age: 30 };\nconst point = #[10, 20];</code></pre>\n\n<h2>9. Promise.allSettled()</h2>\n<p>Handle multiple promises without failing fast:</p>\n<pre><code>const results = await Promise.allSettled([task1(), task2(), task3()]);</code></pre>\n\n<h2>10. Function placeholders (pipeline operator proposal)</h2>\n<p>Cleaner function chaining using the pipeline operator (<code>|&gt;</code>):</p>\n<pre><code>const result = value\n  |> double(#)\n  |> add(3, #)\n  |> Math.sqrt(#);</code></pre>\n\n<p><em>Note:</em> Some features like <code>do</code> expressions and pipeline operator are currently stage 2–3 proposals. Use them with tools like Babel or in experimental environments.</p>\n\n<h2>🚀 Final Thoughts</h2>\n<p>JavaScript in 2025 is more powerful than ever, and mastering these modern techniques will help you write cleaner, more efficient code. Stay curious, keep experimenting, and embrace the evolution of the language.</p>\n\n<p><strong>Which trick was new to you?</strong> Let me know in the comments below or share your own favorite JS tips!</p>",
        likes: 53,
        comments: 12,
        shares: 95,
        profile: ''
    },
    {
        id: 3,
        title: 'What I Learned After Running 12 Marathons in 12 Months',
        username: 'runRachel',
        posted: '1 month ago',
        category: 'Technology',
        tags: ['Running','Fitness Journey','Marathon','Discipline'],
        summary: 'Pushing my body to the limit taught me more than just pacing—it taught me about grit, burnout, and how to listen to my body. Here’s what I wish I knew at the start.',
        blog: '<p>In 2024, I set a goal that sounded crazy to most people: run 12 full marathons in 12 months. One per month. No breaks. I wasn\'t a professional runner or sponsored athlete. I was just someone with a passion, a solid pair of shoes, and a calendar full of registrations.</p>\n\n<p><img src=\"https://example.com/marathon-finish-line.jpg\" alt=\"Crossing the finish line\" style=\"width:100%; max-width:600px; border-radius:6px; margin: 20px 0;\" /></p>\n\n<h2>1. Discipline Beats Motivation</h2>\n<p>Motivation fades—fast. Especially in the cold of January or the brutal heat of July. What carried me through was building routines: waking up early, logging miles even when I didn’t feel like it, and showing up consistently. You don’t need to feel inspired every day. You just need to move.</p>\n\n<h2>2. Burnout Is Real—and Sneaky</h2>\n<p>By marathon number 5, I wasn’t just physically tired—I was emotionally drained. I learned to spot signs of burnout early: irritability, poor sleep, and a loss of excitement. When that happened, I scaled back on training, focused on recovery, and gave myself permission to rest without guilt.</p>\n\n<h2>3. Fuel Matters More Than You Think</h2>\n<p>I used to underestimate nutrition. But once I started eating to support my performance—before, during, and after runs—I noticed a massive improvement in endurance and recovery. Hydration, electrolytes, and carbs became my best friends.</p>\n\n<h2>4. Mental Strength Is Half the Battle</h2>\n<p>At mile 18 of almost every marathon, your body says “stop.” What makes the difference is your mind. Visualization, mantras, and even small tricks like counting steps helped me push through walls I didn’t know I had.</p>\n\n<h2>5. Listen to Your Body—Really</h2>\n<p>There’s a difference between soreness and injury. Between fatigue and depletion. I learned to recognize my limits and respect them. Skipping a long run to prevent injury doesn’t mean you’re slacking—it means you’re smart.</p>\n\n<h2>6. Celebrate Every Finish</h2>\n<p>No matter how fast or slow, every finish line taught me something. Some races were personal records, some were painful slogs. But each one was a reminder of what the human body—and willpower—is capable of.</p>\n\n<p><img src=\"https://example.com/medals-collection.jpg\" alt=\"12 finisher medals hanging on a wall\" style=\"width:100%; max-width:600px; border-radius:6px; margin: 20px 0;\" /></p>\n\n<h2>Final Thoughts</h2>\n<p>Running 12 marathons in 12 months wasn’t just a physical challenge—it was a life lesson in resilience, patience, and self-respect. I wouldn’t necessarily recommend it to everyone, but if you’re considering a challenge that scares you a little... you’re probably on the right track.</p>\n\n<p><strong>Here’s to the next mile.</strong></p>',
        likes: 5,
        comments: 6,
        shares: 10,
        profile: ''
    },
    {
        id: 4,
        title: 'The Rise of Cottagecore: Aesthetic or Escape?',
        username: 'genZ_analyst',
        posted: '4 hours ago',
        category: 'Technology',
        tags: ['Cottagecore','Internet Culture','Trends 2025','Aesthetic'],
        summary: 'Cottagecore isn’t just about floral dresses and bread-making. This blog explores why younger generations are gravitating toward simpler visuals and life ideals in an increasingly digital world.',
        blog: '<p>In 2025, the internet is louder, faster, and more attention-hungry than ever. Amid AI overload, hyper-productivity, and endless content scrolls, a quiet rebellion has been growing—and it’s wrapped in linen, surrounded by wildflowers, and possibly baking sourdough. It’s called <strong>Cottagecore</strong>.</p>\n\n<p><img src=\"https://example.com/cottagecore-tea.jpg\" alt=\"Vintage tea set on a cottage window sill\" style=\"width:100%; max-width:600px; border-radius:6px; margin: 20px 0;\" /></p>\n\n<h2>What Is Cottagecore?</h2>\n<p>Cottagecore is an aesthetic and lifestyle trend that romanticizes rural life, nature, and domestic simplicity. Think soft vintage tones, slow mornings, handwritten letters, cozy cottages, and the gentle hum of life far from screens. It’s a curated return to a pre-industrial ideal—whether through fashion, decor, hobbies, or digital moodboards.</p>\n\n<h2>Why Is It So Popular Now?</h2>\n<p>After years of fast-paced tech acceleration and pandemic-induced digital fatigue, many—especially Gen Z—began craving authenticity, quiet, and control. Cottagecore offers all three. You don’t need to move to the countryside; you just need a few candles, a thrifted dress, and a sense of intention.</p>\n\n<p>More than just a visual style, it’s a soft protest against hustle culture. In a world of metrics and performance, Cottagecore suggests: maybe baking bread and watching rain hit the window is productive in its own right.</p>\n\n<h2>Aesthetic or Escape?</h2>\n<p>It’s easy to dismiss Cottagecore as just another Instagram trend, but its emotional core goes deeper. For many, it’s a form of <em>escapism</em>—a way to imagine life outside stress, expectations, and surveillance capitalism. But for others, it’s a creative outlet, a coping mechanism, or even a path toward actual lifestyle change (hello, off-grid TikTok!).</p>\n\n<p>Of course, like all aesthetics, Cottagecore isn’t without criticism. Some argue it can romanticize colonial nostalgia or ignore the real labor behind farm life. Others point out that many of its visuals center on whiteness, thinness, and traditional femininity. These are valid critiques—and important ones to hold in the same space as the trend’s soothing appeal.</p>\n\n<h2>What It Says About Our Culture</h2>\n<p>Cottagecore’s rise reflects a growing digital generation learning to say “no.” No to constant stimulation. No to mindless consumption. No to being always “on.”</p>\n\n<p>Instead, it says “yes” to presence, slowness, imperfection, and softness. And that, in 2025, feels revolutionary.</p>\n\n<p><strong>So is Cottagecore an aesthetic or an escape?</strong> Maybe it’s both. Maybe that’s the point.</p>\n\n<p><em>What’s your take on Cottagecore? Is it your vibe, or do you prefer chaos-core?</em> Share your thoughts in the comments 🌿</p>',
        likes: 12,
        comments: 1,
        shares: 0,
        profile: ''
    },
    {
        id: 5,
        title: '5 Books That Changed the Way I Think About Money',
        username: 'financeFrida',
        posted: '2 days ago',
        category: 'Technology',
        tags: ['Personal Finance','Books','Mindset','Wealth Building'],
        summary: 'Reading can be transformative. These five titles reshaped how I view earning, saving, and investing—from shifting my mindset to building long-term wealth.',
        blog: '<article>\n  <p>Reading has a way of shifting perspectives—especially when it comes to money. These five books didn’t just offer strategies; they changed how I *think* about earning, saving, and investing.</p>\n\n  <section>\n    <h3>1. <em>Rich Dad Poor Dad</em> by Robert Kiyosaki</h3>\n    <p>This classic reframes wealth-building through the lens of assets vs liabilities and the power of financial education over traditional employment. It taught me that **making money work for me** isn’t about income, but mindset. <sup><a href="#">[1]</a></sup></p>\n  </section>\n\n  <section>\n    <h3>2. <em>The Psychology of Money</em> by Morgan Housel</h3>\n    <p>A stunning dive into how behavior, not spreadsheets, drives financial success. This book reminded me that money decisions are emotional—and building wealth is more about patience than perfect timing. <sup><a href="#">[2]</a></sup></p>\n  </section>\n\n  <section>\n    <h3>3. <em>Your Money or Your Life</em> by Vicki Robin & Joe Dominguez</h3>\n    <p>This guide helped me align my spending with my personal values. It reframed money as life energy—you choose where your energy flows. <sup><a href="#">[3]</a></sup></p>\n  </section>\n\n  <section>\n    <h3>4. <em>The Millionaire Next Door</em> by Thomas J. Stanley & William D. Danko</h3>\n    <p>It debunked flashy wealth myths and showed how ordinary people build extraordinary net worth—often through frugality, discipline, and long-term thinking. <sup><a href="#">[4]</a></sup></p>\n  </section>\n\n  <section>\n    <h3>5. <em>The Richest Man in Babylon</em> by George S. Clason</h3>\n    <p>Timeless financial wisdom delivered through ancient parables. It reinforced foundational principles: pay yourself first, invest wisely, and live within your means. <sup><a href="#">[5]</a></sup></p>\n  </section>\n\n  <hr>\n  <h2>Final Thoughts</h2>\n  <p>What unites these books isn’t their tactics—it’s the shift in mindset: from chasing money to understanding it, from impulse spending to intentional wealth-building. Whether you\'re just starting your financial journey or refining it, these reads can be game-changers.</p>\n  <p><strong>Which of these will you start with?</strong> Or do you have another book that reshaped your money mindset? Share below!</p>\n</article>',
        likes: 3,
        comments: 2,
        shares: 0,
        profile: ''
    },
    {
        id: 6,
        title: 'My First Year Living Abroad in Seoul: What Nobody Tells You',
        username: 'wanderWithJake',
        posted: '3 weeks ago',
        category: 'Technology',
        tags: ['Expat Life','South Korea','Travel','Cultural Shock'],
        summary: 'From apartment hunting to navigating social etiquette, here\'s a raw account of the good, the confusing, and the beautiful parts of moving to Seoul alone.',
        blog: '<article>\n  <p>The first year living abroad in Seoul is a whirlwind — a mix of awe, confusion, joy, and the occasional meltdown. Here’s the gritty, honest version of what nobody tells you when you move to this electric city alone.</p>\n\n  <img src=\"https://photos2.theblueground.com/736/pg64657-o-96da0c7a-8a3b-4f90-9f3e-acadbdd1a6f7.jpeg\" alt=\"Modern Seoul apartment interior\" style=\"width:100%; max-width:600px; border-radius:6px; margin:20px 0;\">\n\n  <h2>1. Apartment Hunting Is a Game</h2>\n  <p>Renting in Seoul feels like a high-stakes game of speed and negotiation. You’ll encounter <strong>wolse</strong> (monthly rent + deposit), and if you\'re adventurous and well-funded, there’s <strong>jeonse</strong>—a massive deposit that replaces rent entirely <sup><a href="#">[1]</a></sup>. Expect to pay significant “key money,” and remember: agents often take up to 0.4% of the rent as commission—anything more is a red flag <sup><a href="#">[2]</a></sup>.</p>\n\n  <h2>2. The Logistics Stack Up</h2>\n  <p>Besides rent, there’s maintenance fees (관리비), utilities, and internet—that can add several hundred USD to your monthly cost <sup><a href="#">[3]</a></sup>. Also, be sure to review the contract carefully—disputes over hidden fees or missing clauses are common unless you\'re vigilant <sup><a href="#">[4]</a></sup>.</p>\n\n  <h2>3. Know the Housing Lingo</h2>\n  <p>Understanding terms like “officetel” (a residential-commercial hybrid), “banjeonse” (partial jeonse), and “gwanlibi” (maintenance fees) is essential <sup><a href="#">[5]</a></sup>. Use apps like Zigbang or Dabang, or go through a bilingual real estate agent for smoother options <sup><a href="#">[6]</a></sup>.</p>\n\n  <h2>4. It’s Lonely—But Connections Happen Unexpectedly</h2>\n  <p>Building a social circle takes time. Sports clubs (frisbee, badminton), solo-friendly bars like Itaewon’s Friday Party, or ex-pat Facebook groups helped me meet others <sup><a href="#">[7]</a></sup>. And sometimes, connections bloom in the most surprising ways—like renting from a local family who end up feeling like your second home <sup><a href="#">[8]</a></sup>.</p>\n\n  <h2>5. Life Requires Adaptation</h2>\n  <p>Rush hour trains, the language barrier, and the intense cultural hierarchy can be overwhelming <sup><a href="#">[9]</a></sup>. But slowly, Seoul grows on you—the neon-lit late nights, neighborhood cafés, and gentle reminders that presence can be found in quiet corners.</p>\n\n  <hr>\n  <h2>Final Thoughts</h2>\n  <p>My first year in Seoul taught me the power of adaptability, patience, and unexpected kindness. It\'s not always glamorous—but it is transformative. Seoul stretches you, challenges you, and ultimately shows you that home isn’t a place—it’s where you learn to thrive.</p>\n  <p><strong>Thinking about moving abroad, or have your own expat story to share?</strong> Let’s chat in the comments below.</p>\n</article>',
        likes: 69,
        comments: 20,
        shares: 311,
        profile: ''
    },
    {
        id: 7,
        title: "Movie review: Cabin in the woods",
        username: "movieBuffReviews",
        posted: "20 minutes ago",
        category: 'Technology',
        tags: ["Movie Review", "Horror", "Cabin In The Woods"],
        summary: "A smart and surprising twist on the horror genre, *Cabin in the Woods* blends classic scares with meta-humor and unexpected plot turns, making it a must-watch for horror fans and skeptics alike.",
        blog: "<article><p><strong>Cabin in the Woods</strong> (2012) isn't your average slasher film. Directed by Drew Goddard and co-written with Joss Whedon, this film starts off with a familiar horror premise — five college friends head to an isolated cabin in the woods for a weekend getaway — but quickly unravels into something much more clever and genre-bending.</p>\n\n<p>At first glance, it seems like another cliché setup: a remote location, creepy warnings from locals, and the usual character tropes — the jock, the nerd, the blonde, the stoner, and the nice guy. But as the story unfolds, the film pulls back the curtain to reveal a secret organization controlling the events behind the scenes, orchestrating the chaos for a much larger and darker purpose.</p>\n\n<p>What sets this film apart is its self-awareness. It plays with the rules of horror, often mocking them, while still delivering tense moments and effective scares. The performances are solid, with standout comedic timing and chemistry from the cast, especially Fran Kranz as the skeptical stoner Marty.</p>\n\n<p>The cinematography and effects strike a balance between old-school horror and modern production. As the third act kicks into gear, things escalate into unexpected, even absurd territory — and that's where the movie shines most. It's a film that rewards horror fans with references and subversions, while still remaining accessible to newcomers.</p>\n\n<p><strong>Verdict:</strong> <em>Cabin in the Woods</em> is more than just a horror movie — it’s a critique, a parody, and a celebration of the genre all in one. If you’re tired of predictable horror films, this one might just restore your faith.</p>\n\n<p><strong>Rating:</strong> ⭐ 8.5/10</p></article>",
        likes: 7,
        comments: 0,
        shares: 30,
        profile: ''
    }
];

const commentsList = [
  {
    "id": 101,
    "posted": "2025-08-09T10:22:00Z",
    "blog_id": 5,
    "user_id": 34,
    "content": "Great book list! I’ve read 3 out of 5 and totally agree about 'The Psychology of Money'. Life-changing!"
  },
  {
    "id": 102,
    "posted": "2025-08-09T10:45:12Z",
    "blog_id": 6,
    "user_id": 18,
    "content": "This is such a real take on expat life. The apartment search part gave me flashbacks 😅"
  },
  {
    "id": 103,
    "posted": "2025-08-09T11:03:45Z",
    "blog_id": 4,
    "user_id": 57,
    "content": "Loved your perspective on Cottagecore. It’s more than just an aesthetic—it’s a shift in values for many of us."
  },
  {
    "id": 104,
    "posted": "2025-08-09T11:15:30Z",
    "blog_id": 6,
    "user_id": 41,
    "content": "I'm moving to Seoul next month. This post is exactly what I needed—thank you!"
  },
  {
    "id": 105,
    "posted": "2025-08-09T11:20:00Z",
    "blog_id": 5,
    "user_id": 22,
    "content": "'The Richest Man in Babylon' is a gem. Glad to see it made your top 5!"
  }
]

export {blogsList, commentsList};