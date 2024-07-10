<template>
	<div class="ui-form">
		<h3 class="ui-form__title h h--2 f f--5">
			{{ isEditMode ? 'Редактировать контакт' : 'Добавить новый контакт' }}
		</h3>

		<form
			class="ui-form__content"
			@submit.prevent="submitForm"
		>
			<div class="ui-form__field">
				<input
					class="ui-form__input t t--16"
					:class="{ 'ui-form__input--error': errors.name }"
					type="text"
					placeholder="Имя и фамилия"
					v-model="formData.name"
					@input="handleInput('name')"
					id="name"
					required
				/>

				<span
					v-if="errors.name"
					class="ui-form__error t t--12"
				>
          {{ errors.name }}
        </span>
			</div>

			<div class="ui-form__field">
				<input
					class="ui-form__input t t--16"
					:class="{ 'ui-form__input--error': errors.phone }"
					type="text"
					placeholder="Номер телефона"
					v-model="formData.phone"
					@input="handlePhoneInput"
					id="phone"
					required
				/>

				<span
					v-if="errors.phone"
					class="ui-form__error t t--12"
				>
          {{ errors.phone }}
        </span>
			</div>

			<div class="ui-form__field">
				<input
					class="ui-form__input t t--16"
					:class="{ 'ui-form__input--error': errors.email }"
					type="email"
					placeholder="Почта"
					v-model="formData.email"
					@input="handleInput('email')"
					id="email"
					required
				/>

				<span
					v-if="errors.email"
					class="ui-form__error t t--12"
				>
          {{ errors.email }}
        </span>
			</div>

			<div class="ui-form__buttons">
				<UiButton
					theme="primary"
					class="ui-form__button"
					type="submit"
				>
					{{ isEditMode ? 'Сохранить изменения' : 'Добавить контакт' }}
				</UiButton>

				<UiButton
					theme="secondary"
					type="button"
					class="ui-form__button"
					@click="$emit('cancel')"
				>
					Отменить
				</UiButton>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { defineProps, defineEmits } from 'vue';
	import { User } from '@/types';
	import UiButton from '@/Ui/UiButton.vue';

	const props = defineProps<{
		isEditMode: boolean;
		contact?: User;
	}>();

	const emit = defineEmits<{
		(e: 'submit', payload: User): void;
		(e: 'cancel'): void;
	}>();

	const formData = ref<User>({
		id: props.contact?.id || Date.now(),
		name: props.contact?.name || '',
		phone: props.contact?.phone || '',
		email: props.contact?.email || '',
		avatar: props.contact?.avatar || 'avatar-default.jpg',
	});

	const errors = ref({
		name: '',
		phone: '',
		email: ''
	});

	watch(
		() => props.contact,
		(newContact) => {
			if (newContact) {
				formData.value = { ...newContact };
			}
		}
	);

	const clearError = (field: string) => {
		errors.value[field as keyof typeof errors.value] = '';
	};

	const validateForm = () => {
		errors.value = {
			name: '',
			phone: '',
			email: ''
		};

		if (!formData.value.name) {
			errors.value.name = 'Имя обязательно для заполнения';
		}

		const phonePattern = /^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
		if (!formData.value.phone) {
			errors.value.phone = 'Телефон обязателен для заполнения';
		} else if (!phonePattern.test(formData.value.phone)) {
			errors.value.phone = 'Некорректный формат телефона';
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.value.email) {
			errors.value.email = 'Почта обязательна для заполнения';
		} else if (!emailPattern.test(formData.value.email)) {
			errors.value.email = 'Некорректный формат почты';
		}

		return !errors.value.name && !errors.value.phone && !errors.value.email;
	};

	const applyPhoneMask = () => {
		let phone = formData.value.phone.replace(/\D/g, '');

		if (phone.length > 1) {
			phone = '+' + phone;
		}
		if (phone.length > 2) {
			phone = phone.slice(0, 2) + '(' + phone.slice(2);
		}
		if (phone.length > 5) {
			phone = phone.slice(0, 6) + ')' + phone.slice(6);
		}
		if (phone.length > 8) {
			phone = phone.slice(0, 10) + '-' + phone.slice(10);
		}
		if (phone.length > 11) {
			phone = phone.slice(0, 13) + '-' + phone.slice(13, 15);
		}

		formData.value.phone = phone;
	};

	const handleInput = (field: string) => {
		clearError(field);
	};

	const handlePhoneInput = (event: Event) => {
		applyPhoneMask();
		clearError('phone');
	};

	const submitForm = () => {
		if (validateForm()) {
			emit('submit', { ...formData.value });
		}
	};
</script>

<style lang="scss">
	.ui-form__title {
		color: var(--main-dark-color);
		text-align: center;
		margin-bottom: 24px;

		@include media(md) {
			margin-bottom: 32px;
		}
	}

	.ui-form__content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 12px;

		@include media(md) {
			gap: 20px;
		}
	}

	.ui-form__field {
		position: relative;
		width: 100%;
	}

	.ui-form__input {
		padding: 12px;
		width: 100%;
		background-color: var(--grey-light-color);
		color: var(--main-dark-color);
		border-radius: var(--border-radius-max);
		border: 1px solid transparent;
		transition: var(--transition);


		@include media(md) {
			padding: 16px;
		}

		&--error {
			border-color: var(--accent-error-color);
		}

		&::placeholder {
			color: var(--grey-dark-color);
			font-size: 16px;
		}
	}

	.ui-form__error {
		position: absolute;
		top: 100%;
		left: 16px;
		color: var(--accent-error-color);
		margin-top: 2px;
	}

	.ui-form__buttons {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 16px;
		margin-top: 24px;

		@include media(md) {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 20px;
			margin-top: 32px;
		}
	}
</style>
