<script lang="ts">
	import type { Message as TMessage } from '$lib/types';
	import { slide } from 'svelte/transition';
	import _ from 'lodash';
	import DiffView from './DiffView.svelte';
	import Modal from './Modal.svelte';
	import Text from './Text.svelte';
	type Props = {
		message: TMessage;
	};
	const { message }: Props = $props();
	const lastAction = message.history.at(-1);
	let toCompare = $state<string[]>([]);
	let expanded = $state(false);

	const toggleHistory = () => {
		expanded = !expanded;
	};

	const toggleToCompare = (id: string) => {
		toCompare = _.xor(toCompare, [id]);
	};

	const sortedTexts = $derived.by(() => {
		const first = message.history.find((h) => h.id === toCompare[0]);
		const second = message.history.find((h) => h.id === toCompare[1]);
		if (!first || !second) return { oldText: '', newText: '' };

		return new Date(first.date) < new Date(second.date)
			? { oldText: first.payload || '', newText: second.payload || '' }
			: { oldText: second.payload || '', newText: first.payload || '' };
	});
</script>

<div class="message-content {lastAction?.type === 'deleted' ? 'deleted' : ''}">
	<button onclick={toggleHistory} class="message-preview">
		<span class="message-text">
			{#if lastAction?.type === 'deleted'}
				<Text variant="body" italic={true} color="muted">Message deleted</Text>
			{:else if !lastAction?.payload}
				<Text variant="body" italic={true} color="muted">No content</Text>
			{:else}
				<Text variant="body">{lastAction?.payload}</Text>
			{/if}
		</span>
		<div class="history-count">{message.history.length}</div>
	</button>
	{#if expanded && message.history.length > 1}
		<div transition:slide class="message-history">
			{#each message.history.slice().reverse() as action, i}
				<div class="history-item {action.type}">
					<div class="history-header">
						<Text variant="small" color="secondary" class="history-type">{action.type}</Text>
						<button
							class={{ 'diff-button': true, 'to-compare': toCompare.includes(action.id) }}
							onclick={() => toggleToCompare(action.id)}
						>
							Compare
						</button>
					</div>
					<Text variant="body">{action.payload || 'No content'}</Text>
					<Text variant="small" color="muted" class="history-date">
						{new Date(action.date).toLocaleString()}
					</Text>
				</div>
			{/each}
		</div>
	{/if}
	<Modal isOpen={toCompare.length === 2} onClose={() => (toCompare = [])}>
		<DiffView oldText={sortedTexts.oldText} newText={sortedTexts.newText} />
	</Modal>
</div>

<style>
	.message-content {
		display: block;
		margin-bottom: 12px;
		max-width: 70%;
		font-size: 15px;
		line-height: 1.4;
		color: #333;

		.message-preview {
			width: 100%;
			border: 1px solid #e5e5e5;
			transition: all 0.2s ease;
			cursor: pointer;
			position: relative;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #ffffff;
			padding: 10px 14px;

			&:hover {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
			}

			&.deleted {
				background: #f8f8f8;
				border-color: #e0e0e0;
				color: #999;
			}

			.history-count {
				border: 1px solid rgba(95, 95, 95, 0.254);
				border-radius: 50%;
				padding-inline: 0.3em;
				font-size: 0.7rem;
			}
			
			.message-text {
				text-align: left;
				padding-right: .8em;
			}

		}

		.message-history {
			margin-top: 12px;
			padding: 8px 14px;
			border: 2px solid #e5e5e5;

			.history-item {
				text-align: left;
				padding: 8px 0;
				border-bottom: 1px solid #f0f0f0;

				&:last-child {
					border-bottom: none;
				}

				.history-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 4px;
				}

				.diff-button {
					font-size: 0.75rem;
					padding: 3px 8px;
					background-color: #f0f0f0;
					border: 1px solid #ddd;
					border-radius: 4px;
					transition: all 0.2s;
					cursor: pointer;
					
					&:hover {
						background-color: #e0e0e0;
					}

					&.to-compare {
						background-color: #e6f7e6;
						border-color: #c3e6c3;
						color: #2e7d32;
					}
				}
			}
		}
	}
</style>
