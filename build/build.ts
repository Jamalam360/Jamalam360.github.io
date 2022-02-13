import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

let html = await Deno.readTextFile("./source/source.html");

async function markdownify(html: string): Promise<string> {
  const matches = html.matchAll(/\$\[(.*?)\]/g);

  console.log(matches);

  if (matches) {
    for (let match of matches) {
      const replace = match[0];
      const link = match[1];

      console.log(`Found Markdown substition link ${replace}`);

      html = html.replaceAll(
        replace,
        Marked.parse(
          await Deno.readTextFile(
            `./source/markdown/${link}.md`,
          ),
        ).content.replaceAll("<p>", "").replaceAll("</p>", ""),
      );
    }
  }

  return html;
}

function styliseLinks(html: string): string {
  const matches = html.matchAll(/S<a.*?<\/a>/g);

  if (matches) {
    for (let match of matches) {
      const replace = match[0];

      console.log(`Found link to be stylised with text-success ${replace}`);

      html = html.replaceAll(
        replace,
        replace.substring(1, 3) + ' class="text-success"' +
          replace.substring(3),
      );
    }
  }

  return html;
}

function format(html: string): string {
  var tab = "\t";
  var result = "";
  var indent = "";

  html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }

    result += indent + "<" + element + ">\r\n";

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });

  return result.substring(1, result.length - 3);
}

html = await markdownify(html);
html = styliseLinks(html);
html = format(html);

await Deno.writeTextFile("index.html", html);
