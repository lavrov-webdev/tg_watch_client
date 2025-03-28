<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	type Props = {
		isOpen: boolean;
		onClose: () => void;
		children: Snippet;
	};

	const { children, isOpen, onClose }: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (isOpen) dialog?.showModal();
	});
</script>

{#if isOpen}
	<dialog
		onclick={(e) => {
			if (e.target === dialog) dialog.close();
		}}
		bind:this={dialog}
		onclose={onClose}
		transition:fly={{ y: 30, duration: 300 }}
	>
		<div class="modal-content">
			{@render children()}
		</div>
	</dialog>
{/if}

<style>
	dialog {
		padding: 0;
		border: none;
		&::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	.modal-content {
		padding: 1.5rem;
		background-color: var(--modal-bg, white);
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
