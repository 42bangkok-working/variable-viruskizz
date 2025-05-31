describe('Should log something like this', () => {
    it('logs "Hello, World!"', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        require('./index'); // This will execute the code in index.js
        expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
        expect(consoleSpy).toHaveBeenCalledWith('Thitiwut Somsa');       
        consoleSpy.mockRestore(); // Restore the original console.log
    });
});
