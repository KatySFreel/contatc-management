<template>
	<button
		:type="type"
		:class="buttonClass"
		@click="$emit('ui-button-click')"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
	import { computed, defineProps, defineEmits } from 'vue';

	const props = defineProps<{
		theme?: 'primary' | 'secondary';
		type?: 'button' | 'submit' | 'reset';
	}>();

	const emits = defineEmits<{
		(e: 'ui-button-click'): void;
	}>();

	const buttonClass = computed(() => `ui-button ui-button--${props.theme || 'primary'}`);
</script>

<style lang="scss">
	.ui-button {
		padding: 12px 16px;
		border-radius: var(--border-radius-max);
		transition: var(--transition);
		border: none;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			opacity: 0.8;
		}

		&--primary {
			background-color: var(--accent-color);
			color: var(--btn-text-dark-color);
		}

		&--secondary {
			background-color: var(--grey-dark-color);
			color: var(--btn-text-dark-color);
		}
	}
</style>
