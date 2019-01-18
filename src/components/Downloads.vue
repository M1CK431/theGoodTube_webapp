<template>
  <div class="m-2">
    Downloads which are in state "{{ downloadsType }}"<br />
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t("NAME") }}</th>
          <th>{{ $t("SIZE") }}</th>
          <th>{{ $t("PROGRESSION") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(download, index) in downloads">
          <td>{{ download.name }}</td>
          <td>{{ download.size }}</td>
          <td>
            <b-progress
              :value="download.progress"
              :max="100"
              variant="success"
              show-progress
              animated
            ></b-progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const downloads = [
  { id: 1, name: "first dl", size: "18 Mo", progress: 14 },
  { id: 2, name: "second dl", size: "1 To", progress: 82 },
  { id: 3, name: "third dl", size: "5 Go", progress: 42 }
];

export default {
  name: "Downloads",
  props: {
    downloadsType: {
      type: String,
      required: true
    }
  },
  data: function() {
    return { downloads };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
