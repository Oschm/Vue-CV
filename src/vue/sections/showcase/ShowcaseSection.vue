<template>
  <SectionTemplate :section-data="props.sectionData">
    <!-- SubHeading -->
    <SubHeading
      :title="props.sectionData['content']['locales']['subtitle']"
      :description="
        props.sectionData['content']['locales']['subtitleDescription']
      "
      class="mt-4"
    />

    <div id="right" style="width: 30%; float: left">
      <div class="form-group input-group">
        <div class="form-label">{{ data.getString("grossIncome") }}</div>
        <input
          class="form-control-income"
          id="form-income"
          type="text"
          v-model="props.sectionData['content']['items'].grossIncome"
          @input="($event) => handleInput($event, props)"
          required
        />
        <div class="form-label">€</div>
      </div>
      <!-- Bottom Column -->
      <div class="button-container">
        <button
          class="btn btn-primary btn-xl"
          type="submit"
          @click="($event) => onCalculate($event, props)"
          id="btn-submit-message"
        >
          <i class="fa fa-envelope me-1" />
          {{ data.getString("calculateIncomeTax") }}
        </button>
      </div>
    </div>
    <div id="leftAndCenter" style="width: 70%; float: right">
      <div
        id="center"
        style="width: 35%; display: flex; float: left; justify-content: right"
      >
        <!-- Description -->
        <p
          v-if="props.sectionData['content']['items'].result"
          class="section-subheading-description lead text-muted"
          v-html="props.sectionData['content']['items'].result"
        ></p>
      </div>
      <div id="right" style="width: 35%; float: right"></div>
    </div>
    <div id="right" style="width: 30%; float: left">
      <!-- Feedback Alert -->
      <div class="col-12 mb-1" v-if="alertStatus">
        <Alert :type="alertStatus.type" :message="alertStatus.message" />
      </div>
    </div>
  </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue";
import { useData } from "../../../composables/data.js";
import SubHeading from "../_templates/SubHeading.vue";
import Alert from "../../widgets/Alert.vue";
import { calculateIncomeTax } from "../../services/taxService.js";
import { computed } from "vue";

/**
 * @property {Object} sectionData
 */
const props = defineProps({
  sectionData: Object,
});
const data = useData();
props.sectionData.grossIncome = 10000.0;

var alertStatus = null;

const handleInput = function (event, props) {
  // Remove non-numeric characters, except for the decimal point
  let newValue = event.target.value.replace(/[^0-9.]/g, "");

  let parts = newValue.split(".");
  // Ensure there is only one decimal point
  const decimalCount = parts.length - 1;
  if (decimalCount > 1) {
    // If there is more than one decimal point, remove the extras
    newValue = parts[0] + "." + parts.slice(1).join("");
  }
  //reinstatiate parts to get result from last step
  parts = newValue.split(".");
  //check that there are not more than 2 digits
  if (parts[1] && parts[1].length > 2) {
    newValue = parts[0] + "." + parts[1].slice(0, 2);
  }
  // Update the value in the component's data
  props.sectionData.content.items.grossIncome = newValue;
  props.sectionData.content.items.previousValue = newValue;
};

const onCalculate = function (event, props) {
  debugger;
  console.log(
    "Button clicked with grossIncome: " +
      props.sectionData.content.items.grossIncome
  );
  let grossIncome = props.sectionData.content.items.grossIncome;
  //call tax service, TODO: implement isMarried and year
  calculateIncomeTax(
    grossIncome,
    null,
    null,
    function (result) {
      console.log("success: " + JSON.stringify(result));
      alertStatus = null;
      props.sectionData["content"]["items"].result =
        data.getString("taxServiceResult") + result.sum + "€";
    },
    function (error) {
      console.log("error");
      alertStatus = {
        type: "danger",
        message: data.getString("taxServiceError"),
      };
    }
  );
}.bind(this);

const onlyForCurrency = ($event, props) => {
  // console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;

  // only allow number and one dot
  if (
    (keyCode < 48 || keyCode > 57) &&
    !(keyCode === 8) &&
    !(
      keyCode === 190 &&
      props.sectionData.content.items.grossIncome.indexOf(".") != -1
    )
  ) {
    // 190 is dot
    $event.preventDefault();
  }

  // restrict to 2 decimal places
  if (
    props.sectionData.content.items.grossIncome != null &&
    props.sectionData.content.items.grossIncome.indexOf(".") > -1 &&
    props.sectionData.content.items.grossIncome.split(".")[1].length < 2
  ) {
    $event.preventDefault();
  }
};
</script>

<style lang="scss" scoped>
.input-group {
  justify-content: right;
}
.form-control-income {
  width: 20%;
  margin-right: 10px;
  margin-left: 10px;
}
.form-label {
  margin: 10px;
  font-size: large;
  font-weight: bold;
}
.button-container {
  text-align: right; /* Right-align the button */
  margin-top: 10px;
}
</style>
