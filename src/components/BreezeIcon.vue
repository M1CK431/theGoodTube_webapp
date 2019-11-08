<template>
  <img :src="src" alt="mimetype icon" :height="`${size}px`" />
</template>

<script>
const iconTypesMap = [
  { icon: "audio-x-mpeg", typeMatch: /mp4a/ },
  { icon: "video-mp4", typeMatch: /mp4|avc1/ },
  { icon: "video-webm", typeMatch: /webm/ },
  { icon: "application-ogg", typeMatch: /opus/ },
  { icon: "application-x-zerosize", typeMatch: /.*/ } // default
];

export default {
  props: {
    type: { type: String, default: "" },
    size: {
      type: Number,
      default: 64,
      validator: size => [16, 22, 32, 64].includes(size)
    }
  },
  computed: {
    src() {
      const origin =
        "https://raw.githubusercontent.com/KDE/breeze-icons/master/icons/mimetypes";
      const { type, size } = this;
      const { icon } = iconTypesMap.find(({ typeMatch }) =>
        typeMatch.test(type)
      );

      return `${origin}/${size}/${icon}.svg?sanitize=true`;
    }
  }
};
</script>

<style lang="css" scoped></style>
