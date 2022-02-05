let html = await Deno.readTextFile("./source.html");

const links: Record<string, string> = {
    Blog: "https://jamalam.tech/blog",
    Deno: "https://deno.land/",
    Kordex: "https://github.com/Kord-Extensions/kord-extensions",
    Kotlin: "https://kotlinlang.org/",
    TypeScript: "https://www.typescriptlang.org/",
    TS: "https://www.typescriptlang.org/",
    JavaScript: "https://www.javascript.com/",
    JS: "https://www.javascript.com/",
    Java: "https://www.java.com/",
    Discord: "https://discord.com/",
    QuiltMC: "https://github.com/QuiltMC",
    Quilt: "https://github.com/QuiltMC",
    Fabric: "https://fabricmc.net/",
    Python: "https://www.python.org/",
    Aleph: "https://alephjs.org"
}

Object.keys(links).forEach(element => {
    html = html.replaceAll("[" + element + "]", `<a href="${links[element]}" class="text-success"><i>${element}</i></a>`);
});

await Deno.writeTextFile("index.html", html);