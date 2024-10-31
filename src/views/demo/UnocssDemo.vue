<template>
  <div class="text-c1">灰色字体配置</div>
  <div class="text-c2">灰色字体配置</div>
  <button class="btn_sans text-c1">按扭字体 Click me</button>
  <button class="btn_serif text-c2">按扭字体 Click me</button>

  <!-- 应用 btn1 按钮颜色 -->
  <button class="btn1">Button 1</button>

  <!-- 应用 sha2 阴影效果 -->
  <div class="sha2">This div has shadow effect sha2.</div>
</template>

<style>
.text-c1 {
  color: theme('colors.c1');
}
.btn_sans {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: theme('fontFamily.sans'); /* 使用 theme 中定义的字体 */
}
.btn_serif {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: theme('fontFamily.serif'); /* 使用 theme 中定义的字体 */
}
</style>
