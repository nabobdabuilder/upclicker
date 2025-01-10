class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '_____';
        this.originalText = el.innerText;
        this.originalHTML = el.innerHTML;
        this.update = this.update.bind(this);
    }

    async setText(newText) {
        if (this.el.classList.contains('brand-name')) {
            return Promise.resolve();
        }

        // Split text into words
        const words = newText.split(/\s+/);
        const oldWords = this.el.innerText.split(/\s+/);
        let currentText = oldWords.join(' ');
        
        // Animate each word sequentially
        for (let i = 0; i < words.length; i++) {
            const beforeWords = words.slice(0, i);
            const afterWords = oldWords.slice(i + 1);
            const targetWord = words[i];
            
            await this.animateWord(
                currentText,
                [...beforeWords, targetWord, ...afterWords].join(' '),
                beforeWords.join(' ').length,
                targetWord.length
            );
            
            currentText = [...beforeWords, targetWord, ...afterWords].join(' ');
        }
    }

    async animateWord(oldText, newText, startPos, length) {
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        // Only scramble the specific word
        for (let i = 0; i < length; i++) {
            const pos = startPos + i;
            const from = oldText[pos] || '';
            const to = newText[pos] || '';
            const start = Math.floor(Math.random() * 15);  // Reduced randomness
            const end = start + Math.floor(Math.random() * 10);  // Shorter animation
            this.queue.push({ from, to, start, end, pos });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.fullText = newText;
        this.update();
        return promise;
    }

    update() {
        let complete = 0;
        let output = this.fullText.split('');
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char, pos } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output[pos] = to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.1) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output[pos] = char;
            } else {
                output[pos] = from;
            }
        }
        
        this.el.innerText = output.join('');
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Intersection Observer setup
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
            const scrambler = new TextScramble(entry.target);
            const text = entry.target.innerText;
            scrambler.setText(text).then(() => {
                if (entry.target.dataset.originalHtml) {
                    entry.target.innerHTML = entry.target.dataset.originalHtml;
                }
            });
            entry.target.dataset.scrambled = 'true';
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.2,
    rootMargin: '50px'
});

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.scramble-text');
    
    elements.forEach(el => {
        el.dataset.originalHtml = el.innerHTML;
        observer.observe(el);
    });
});
