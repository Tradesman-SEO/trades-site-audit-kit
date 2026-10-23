import {parse} from 'parse5';
import {array,text,escape,issue,table,issuesHTML} from './util.js';
export const guide='Supply site, baseUrl and pages [{url,html}]. HTML is parsed with parse5 locally. The CLI also accepts --manifest manifest.json to read exported files within the manifest directory. No crawling or network requests.';
const walk=node=>[node,...(node.childNodes||[]).flatMap(walk)];
const content=node=>(node.nodeName==='#text'?node.value:(node.childNodes||[]).map(content).join(''));
const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
export function analyse(input){
 text(input.site,'site');const base=new URL(text(input.baseUrl,'baseUrl'));if(!['http:','https:'].includes(base.protocol))throw Error('Invalid base origin');const issues=[];
 const pages=array(input.pages,'pages').map(p=>{
  const url=new URL(p.url,base);if(url.origin!==base.origin)throw Error('Page outside site origin');text(p.html,'html');
  const nodes=walk(parse(p.html)),title=nodes.find(n=>n.tagName==='title'),h1s=nodes.filter(n=>n.tagName==='h1').map(content),canonical=nodes.filter(n=>n.tagName==='link'&&(attr(n,'rel')||'').split(/\s+/).includes('canonical')).map(n=>attr(n,'href'));
  const description=nodes.find(n=>n.tagName==='meta'&&attr(n,'name')?.toLowerCase()==='description'),robots=nodes.filter(n=>n.tagName==='meta'&&['robots','googlebot'].includes(attr(n,'name')?.toLowerCase())).map(n=>attr(n,'content')||'');
  const links=nodes.filter(n=>n.tagName==='a').map(n=>attr(n,'href')||'');
  if(!title||!content(title).trim())issues.push(issue('title','Missing or empty title',url.href));
  if(!description||!attr(description,'content')?.trim())issues.push(issue('description','No non-empty meta description in this export',url.href));
  if(h1s.length!==1)issues.push(issue('h1','Observed '+h1s.length+' H1 elements; review page structure',url.href));
  if(canonical.length>1)issues.push(issue('canonical','Multiple canonical annotations; inspect intended destination',url.href));
  for(const c of canonical){try{const target=new URL(c,url);if(target.href!==url.href)issues.push(issue('canonical-target','Canonical differs from page URL; may be intentional',url.href));}catch{issues.push(issue('canonical-invalid','Canonical is not a valid URL',url.href));}}
  if(robots.some(r=>/\bnoindex\b/i.test(r)))issues.push(issue('publishing-review','Explicit noindex found. Confirm owner intent; do not remove automatically.',url.href));
  for(const href of links.filter(l=>/^tel:/i.test(l)))if(!/^tel:\+?[0-9][0-9 ()-]{4,}(?:;ext=[0-9]+)?$/i.test(href))issues.push(issue('telephone','Malformed telephone link',url.href));
  if(!links.some(h=>/^(tel:|mailto:)/i.test(h)))issues.push(issue('contact','No direct telephone/email link in exported HTML; check other enquiry routes',url.href));
  return {url:url.href,title:title?content(title).trim():'',h1s,canonical,robots,links};
 });
 return {title:input.site+' exported HTML review',summary:'Offline observations, not keyword research, live rendering or ranking predictions. Intentional publishing settings need owner review.',pages,issues,markdown:issues.map(i=>'- '+i.source+' | '+i.code+' | '+i.message).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+table(['Page','Title','H1 count','Robots'],r.pages.map(p=>[p.url,p.title||'Missing',p.h1s.length,p.robots.join('; ')||'Not supplied']))+issuesHTML(r.issues);
