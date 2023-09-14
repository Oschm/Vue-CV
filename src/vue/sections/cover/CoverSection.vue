<template>
  <SectionTemplate :section-data="props.sectionData">
    <!-- Title -->
    <h1 class="cover-title display-1" v-html="coverTitle" />

    <!-- Divider -->
    <hr class="solid-divider ms-1 me-1" />
    <!-- Info Items -->
    <InlineList
      class="info-list"
      :items="props.sectionData.content['items']['contactListItems']"
    />
    <!-- Description -->
    <p
      class="cover-description lead text-normal mb-4 mb-md-5"
      v-html="props.sectionData.content['locales']['bio']"
    />
    <!-- Soft and Tech Skills -->
    <div
      v-for="subcategory in props.sectionData.content['skillsOverview'][
        'subcategories'
      ]"
      class="col-12 subcategory-col"
    >
      <!-- Subcategory Title -->
      <SubHeading
        :title="subcategory['locales']['title']"
        :fa-icon="subcategory['faIcon']"
      />
      <HoverCardList :items="_fetchAndParseItemsFor(subcategory)" />
    </div>
    <!-- Social Links -->
    <SubHeading title="Corporate Media" fa-icon="fa-solid fa-hashtag" />

    <SocialLinks :items="props.sectionData.content['items']['socialCircles']" />
  </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue";
import { computed } from "vue";
import { useData } from "../../../composables/data.js";
import { useNavigation } from "../../../composables/navigation.js";
import InlineList from "../../widgets/InlineList.vue";
import SocialLinks from "../../widgets/SocialLinks.vue";
import SubHeading from "../_templates/SubHeading.vue";
import HoverCardList from "../_templates/HoverCardList.vue";

const data = useData();
const navigation = useNavigation();

/**
 * @param subcategory
 * @return {Object[]}
 * @private
 */
const _fetchAndParseItemsFor = (subcategory) => {
  const items =
    props.sectionData["content"]["skillsOverview"]["items"][subcategory["id"]];
  return items;
};

/**
 * @property {Object} sectionData
 */
const props = defineProps({
  sectionData: Object,
});

/**
 * @type {ComputedRef<String>}
 */
const coverTitle = computed(() => {
  if (navigation.isAllAtOnceMode()) {
    return props.sectionData.content["locales"]["welcome"];
  } else {
    return props.sectionData.content["locales"]["welcomeShort"];
  }
});
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.cover-title {
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.solid-divider {
  @include media-breakpoint-up($navigation-sidebar-breakpoint) {
    display: none;
  }
}

.info-list {
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        margin-bottom: 2.5rem,
      ),
      lg: (
        margin-bottom: 2rem,
      ),
      md: (
        margin-bottom: 1.2rem,
      ),
    )
  );
}
</style>
