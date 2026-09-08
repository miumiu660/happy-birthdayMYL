export const characterFrames=[{x:0,w:335,h:362},{x:690,w:335,h:463},{x:343,w:335,h:374}];
export function CharacterArt({kind}:{kind:number}){const f=characterFrames[kind];return <svg viewBox={f.x+' 0 '+f.w+' '+f.h} className="character-cutout" role="img" aria-label={['Chiikawa','Usagi','Hachiware'][kind]}><image href="/images/character-sheet.png" width="3766" height="463"/></svg>;}
