<template>
  <div class="container">
        <e-table
          ref="recordSpTableRef"
          :tableList="tableList"
          :options="options"
          :columns="columns"
          :operates="operates"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
      </div>
    </div>
    <!-- 预警详情 -->
    <warning-detail ref="warningDialog" />
  </div>
</template>