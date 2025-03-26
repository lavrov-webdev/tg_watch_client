import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using adapter-node for production deployment on Linux server
		adapter: adapter({
			// Default options are fine for most cases
			// You can customize these if needed:
			// out: 'build',
			// precompress: false,
			// envPrefix: '',
		})
	}
};

export default config;
