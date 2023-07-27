<template>
    <StackLayout class="p-20" backgroundColor="white">
        <Label text="Merci !"/>
        <TextView v-if="!$store.state.closemodal" editable="false" text="Envoie photo, description, et géolocalisation" />
        <ActivityIndicator v-if="!$store.state.closemodal" busy="true"></ActivityIndicator>
        <TextView v-if="$store.state.closemodal" editable="false" text="Photo, description, et géolocalisation envoyées" />
        <Button v-if="$store.state.closemodal" class="btn btn-outline" text="fermer" @tap="$modal.close()" />
    </StackLayout>
</template>

<script>
    import {
        Label
    } from "tns-core-modules/ui/label";
    export default {
        data() {
            return {};
        }
    };
</script>

<style>
</style>