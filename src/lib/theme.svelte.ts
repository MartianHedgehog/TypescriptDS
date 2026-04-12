export function useCssVar(name: string, fallback: string) {
	let value = $state(fallback);
	$effect(() => {
		value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	});
	return {
		get value() {
			return value;
		},
	};
}
