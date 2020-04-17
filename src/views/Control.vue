<template>
  <div class="">
    <fish-tabs value="control">
      <fish-tab-pane label="Control" index="control">
        <section class="container">
          <fish-button
            @click="toggleMute()"
            :type="isMuted ? '' : 'negative'"
            shape="circle"
            style="width:100px;"
          >
            <font-awesome-icon v-show="isMuted" icon="microphone-alt-slash" />
            <font-awesome-icon v-show="!isMuted" icon="microphone-alt" />
          </fish-button>

          <fish-button
            @click="playSE('grin')"
            :loading="isGrinPlaying"
            type="primary"
            shape="circle"
            style="width:50px;"
          >
            <font-awesome-icon icon="grin-squint-tears" />
          </fish-button>

          <fish-button
            @click="playSE('meh')"
            :loading="isMehPlaying"
            type="primary"
            shape="circle"
            style="width:50px;"
          >
            <font-awesome-icon icon="meh-rolling-eyes" />
          </fish-button>

          <figcaption>Voice</figcaption>
          <audio ref="audio" autoplay controls :muted="isMuted"></audio>

          <figcaption>Mixin Laughter</figcaption>
          <audio
            controls
            ref="laughter"
            src="@/assets/people-studio-laugh-normal1.mp3"
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>

          <figcaption>Mixin Eee</figcaption>
          <audio controls ref="eee" src="@/assets/people-studio-ee1.mp3">
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </section>
      </fish-tab-pane>
      <fish-tab-pane label="Preferences" index="preferences">
        <section class="container">
          <figcaption>Voice Input Source</figcaption>
          <select
            v-model="selectedVoiceInput"
            @change="setVoiceInputDevice(selectedVoiceInput)"
          >
            <option disabled value="">Please select one</option>
            <option
              v-for="(deviceId, index) in inputAudioDeviceIds"
              :key="index"
              :value="deviceId.deviceId"
              >{{ deviceId.label }}</option
            >
          </select>
          <figcaption>Voice Output Source</figcaption>
          <select
            v-model="selectedVoiceOutput"
            @change="setVoiceOutputDevice()"
          >
            <option disabled value="">Please select one</option>
            <option
              v-for="(deviceId, index) in outputAudioDeviceIds"
              :key="index"
              :value="deviceId.deviceId"
              >{{ deviceId.label }}</option
            >
          </select>
          <figcaption>SE Output Source</figcaption>
          <select v-model="selectedSEOutput" @change="setSEOutputDevice()">
            <option disabled value="">Please select one</option>
            <option
              v-for="(deviceId, index) in outputAudioDeviceIds"
              :key="index"
              :value="deviceId.deviceId"
              >{{ deviceId.label }}</option
            >
          </select>
        </section>
      </fish-tab-pane>
    </fish-tabs>
  </div>
</template>

<script>
export default {
  name: 'Control',
  components: {},
  data() {
    return {
      isMuted: false,
      isGrinPlaying: false,
      isMehPlaying: false,
      selectedVoiceInput: '',
      selectedVoiceOutput: '',
      selectedSEOutput: '',
      inputAudioDeviceIds: [],
      outputAudioDeviceIds: []
    }
  },
  methods: {
    toggleMute() {
      this.isMuted = !this.isMuted
      this.$refs.audio.muted = this.isMuted
    },
    playSE(type) {
      switch (type) {
        case 'grin':
          this.isGrinPlaying = true
          this.$refs.laughter.play()
          setTimeout(() => {
            this.isGrinPlaying = false
          }, 1000)
          break

        case 'meh':
          this.isMehPlaying = true
          this.$refs.eee.play()
          setTimeout(() => {
            this.isMehPlaying = false
          }, 1000)
          break

        default:
          break
      }
    },
    getDevices() {
      navigator.mediaDevices
        .enumerateDevices()
        .then(mediaDevices => {
          console.table(mediaDevices)
          for (const item of mediaDevices) {
            const deviceId = item.deviceId
            const label = item.label

            switch (item.kind) {
              case 'audioinput':
                this.inputAudioDeviceIds.push({ deviceId, label })
                break
              case 'audiooutput':
                this.outputAudioDeviceIds.push({ deviceId, label })
                break

              default:
                break
            }
          }
        })
        .catch(e => {
          alert('ERROR:' + e.message)
        })
    },
    setVoiceInputDevice(deviceId) {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: {
            deviceId: deviceId
          }
        })
        .then(stream => {
          console.log(stream)
          // set input audio
          this.$refs.audio.srcObject = stream
        })
        .catch(e => {
          alert('ERROR:' + e.message)
        })
    },
    setVoiceOutputDevice() {
      // set output audio
      this.$refs.audio.setSinkId(this.selectedVoiceOutput)
    },
    setSEOutputDevice() {
      // set output audio
      this.$refs.laughter.setSinkId(this.selectedSEOutput)
      this.$refs.eee.setSinkId(this.selectedSEOutput)
    }
  },
  mounted() {
    this.getDevices()
  }
}
</script>

<style>
.container {
  padding: 10px;
}
.button {
  margin: 2px;
}
</style>
