describe('Test variable', () => {

    let fs, path, fileContent, Var, logSpy;

    beforeAll(() => {
        // create a spy for console.log
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        fs = require('fs');
        path = require('path');
        try {
            fileContent = fs.readFileSync(path.resolve(__dirname, './index.js'), 'utf8');
            Var = require('./index'); // this might throw
        } catch (error) {
            // Force the test suite to fail
            console.error('❌ Cannot load index.js:', error.message);
            process.exit(1); // ⛔ hard exit, Jest stops immediately
        }
    })

    afterAll(()=>{
        logSpy.mockRestore(); // Restore the original console.log
    })
    
    it('should be defined PI variable with 3.14', () => {
        expect(Var.PI).toBeDefined();
        expect(Var.PI).toBe(3.14);  
    });

    it('should declare PI using const', () => {
        const constPattern = /\bconst\s+PI\b/;
        expect(constPattern.test(fileContent)).toBe(true);
    });

    it('should be defined answer variable with 42', () => {
        expect(Var.answer).toBeDefined();
        expect(Var.answer).toBe(42);
    });

    it('should declare answer using let', () => {
        const letPattern = /\blet\s+answer\b/;
        expect(letPattern.test(fileContent)).toBe(true);
    });

    it('should be defined count variable with 0', () => {
        expect(Var.count).toBeDefined();
        expect(Var.count).toBe(0);
    });

    it('should declare count using var', () => {
        const varPattern = /\bvar\s+count\b/;
        expect(varPattern.test(fileContent)).toBe(true);
    });

    it('should be defined SchoolOfCode variable with 42Bangkok', () => {
        expect(Var.SchoolOfCode).toBeDefined();
        expect(Var.SchoolOfCode).toBe('42Bangkok');
    });

    it('should declare SchoolOfCode using const', () => {
        const constPattern = /\bconst\s+SchoolOfCode\b/;
        expect(constPattern.test(fileContent)).toBe(true);
    });

    it('should log all variables to the console', () => {
        const consoleLogPattern = /console\.log\(\s*PI\s*,\s*answer\s*,\s*count\s*,\s*SchoolOfCode\s*\)/;
        expect(consoleLogPattern.test(fileContent)).toBe(true);
    });
 
    it('should log variables in declaration order', () => {
        expect(logSpy).toHaveBeenCalledWith(Var.PI, Var.answer, Var.count, Var.SchoolOfCode);
    });
    
});
