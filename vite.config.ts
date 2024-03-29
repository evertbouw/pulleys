import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['**/*.test.ts', '**/*.test.tsx'],
        environment: 'jsdom',
        setupFiles: ['./setupTests.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'lcov'],
        },
    },
});
