const sdk=globalThis.ytgame;
export const embedded=!!sdk?.IN_PLAYABLES_ENV;
let loaded=false,queue=Promise.resolve();
export const platform={
 firstFrame(){if(embedded)sdk.game.firstFrameReady();},ready(){if(embedded)sdk.game.gameReady();},
 async load(){try{const data=embedded?await sdk.game.loadData():localStorage.getItem('luma-grove-v1');loaded=true;try{return data?JSON.parse(data):null;}catch{return null;}}catch{return null;}},
 save(data){if(!loaded)return Promise.resolve(false);const value=JSON.stringify(data);queue=queue.then(async()=>{try{if(embedded)await sdk.game.saveData(value);else localStorage.setItem('luma-grove-v1',value);return true;}catch{return false;}});return queue;},
 bind({pause,resume,audio}){if(embedded){sdk.system.onPause(pause);sdk.system.onResume(resume);sdk.system.onAudioEnabledChange(audio);audio(sdk.system.isAudioEnabled());}else document.addEventListener('visibilitychange',()=>document.hidden?pause():resume());}
};
