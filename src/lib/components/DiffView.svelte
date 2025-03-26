<script lang="ts">
	import { diff_match_patch } from 'diff-match-patch';
	const dmp = new diff_match_patch();

	type Props = {
		oldText: string;
		newText: string;
	};

	const { oldText, newText }: Props = $props();

	const diffs = $derived.by(() => {
		const d = dmp.diff_main(oldText, newText);
		dmp.diff_cleanupSemantic(d);
		return d;
	});

	function getDiffClass(op: number): string {
		switch (op) {
			case -1:
				return 'deleted';
			case 1:
				return 'added';
			default:
				return '';
		}
	}
</script>

<div class="diff-container">
	<div class="diff-section old">
		<h4>Old Version</h4>
		{#each diffs as [op, text]}
			{#if op !== 1}
				<span class={getDiffClass(op)}>{text}</span>
			{/if}
		{/each}
	</div>

	<div class="diff-section new">
		<h4>New Version</h4>
		{#each diffs as [op, text]}
			{#if op !== -1}
				<span class={getDiffClass(op)}>{text}</span>
			{/if}
		{/each}
	</div>
</div>

<style>
	.diff-container {
		font-family: monospace;
		white-space: pre-wrap;
		margin: 1em 0;
		overflow: hidden;
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}

	.diff-section {
		padding: 0.5em;
	}

	.old {
		background-color: #ffdddd;
	}

	.new {
		background-color: #ddffdd;
	}

	.added {
		background-color: #a6f3a6;
	}

	.deleted {
		background-color: #f8cbcb;
		text-decoration: line-through;
	}
</style>
