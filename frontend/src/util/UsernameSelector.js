function finalUsername(selectedTypes) {
    const username = selectedTypes
                        .map((part, index) => {
                            const word = part[Math.floor(Math.random() * part.length)];
                            return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
                        })
                        .join('');

    return username;
}


function generatedUsername() {
    const adjective = [ 'silent', 'brave', 'swift', 'bright', 'calm', 'clever', 'gentle', 'bold', 'steady', 'curious', 'kind',
                        'sharp', 'quiet', 'fierce', 'lucky', 'cool', 'warm', 'smooth', 'wise', 'quick', 'strong', 'happy', 
                        'sad', 'angry', 'peaceful', 'friendly', 'graceful', 'playful', 'mysterious', 'elegant', 'vibrant' ];

    const noun = [ 'fox', 'otter', 'hawk', 'panda', 'tiger', 'wolf', 'sparrow', 'owl', 'bear', 'lynx', 'falcon', 'whale', 'rabbit',
                    'deer', 'badger', 'eagle', 'seal', 'turtle', 'dolphin', 'cat', 'river', 'forest', 'stone', 'ember', 'breeze',
                    'cloud', 'shadow', 'flame', 'wave', 'leaf', 'storm', 'rain', 'snow', 'dust', 'light', 'echo', 'mist', 'sun',
                    'moon', 'star', 'node', 'byte', 'pixel', 'vector', 'signal', 'data', 'logic', 'stack', 'array', 'hash', 'kernel',
                    'cipher', 'loop', 'cache', 'stream', 'cloud', 'thread', 'socket', 'index', 'queue' ];

    const verb = [ 'drift', 'glide', 'spark', 'shift', 'flow', 'build', 'move', 'think', 'grow', 'adapt', 'create', 'shape', 'learn',
                    'focus', 'explore', 'connect', 'balance', 'travel', 'design', 'code', 'dream', 'fly', 'soar', 'dive', 'sail',
                    'wander', 'roam', 'climb', 'run', 'jump', 'swim', 'crawl', 'dance', 'sing', 'write', 'paint' ];

    const suffix = [ '01', '42', '99', '007', '123', '321', '2024', '314', '2718', '1618', '777', '888', '555', '666', '000',
                     'abc', 'xyz', 'foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred', 'plugh',
                     'xyzzy', 'thud'];

    const formats = [ [adjective, noun], [noun, suffix], [verb, noun], [adjective, noun, suffix], [verb, noun, suffix] ];
    const username = finalUsername(formats[Math.floor(Math.random() * formats.length)]);
    
    return username;
}

export { generatedUsername }