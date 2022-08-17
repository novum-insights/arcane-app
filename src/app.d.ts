// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
interface SessionData {
	// Your session data
	dehydratedState: string;
}

declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<SessionData>;
		cookies: Record<string, string>; // all parsed cookies are automatically set from handleSession to avoid overhead
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	interface Session extends SessionData { }
}
