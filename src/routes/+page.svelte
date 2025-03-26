<script lang="ts">
	import Text from '$lib/components/Text.svelte';
</script>

<div class="placeholder">
	<div class="emoji">👋</div>
	<Text variant="h3" color="primary" align="center">Welcome to Telegram Watch</Text>
</div>

<style>
	.placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.emoji {
		font-size: 48px;
		margin-bottom: 16px;
	}
</style>
