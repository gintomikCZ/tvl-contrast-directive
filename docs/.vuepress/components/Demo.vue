<template>
  <div class="demo-wrap">
    <div class="container">
      <h3>1</h3>
      <p>First container has both - text color and background color set by a css class. The contrast ratio meets both WCAG standards.</p>
      <div class="boxes first-div" v-contrast>
        <div><span>background: </span><b>#2C0703</b></div>
        <div><span>text color: </span><b>#DA9F93</b></div>
      </div>
    </div>
    <div class="container">
      <h3>2</h3>
      <p>The value of background css property is set to transparent for this container. The directive in this case calculates wih the closest ancestor value which is the background color of this page section - #efefef. The contrast ratio meets the AA criteria level, but it is not sufficient for AAA level.</p>
      <div class="boxes second-div" v-contrast>
        <div><span>background: </span><b>transparent</b></div>
        <div><span>text color: </span><b>#B6465F</b></div>
      </div>
    </div>
    <div class="container">
      <h3>3</h3>
      <p>The color of text in this div has not been set by CSS on the element itself. The value inherited from document body element applies in this case and it is also used in the contrast ratio calculation. However the contrast is really poor, it doesn't meet the WCAG standards.</p>
      <div class="boxes third-div" v-contrast>
        <div><span>background: </span><b>#eb4511</b></div>
        <div><span>text color: </span><b>#2c3e50 (inherited)</b></div>
      </div>
    </div>¨
  </div>
</template>
<script>
export default {
  name: 'Demo',
}
</script>
<style>
.demo-wrap {
  background: #efefef;
  padding: 10px 10px 30px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dadada;
  border-radius: 3px;
}
.container {
  margin-top: 20px;
  padding: 20px;

}
.container p {
  line-height: 1.2;
  text-align: justify;
  min-width: 150px
}
.boxes {
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0,0.33);
  padding: 12px;
  border-radius: 3px;
  margin-bottom: 20px
}
.boxes > div:first-child {
  margin-bottom: 4px
}
.first-div {
  background: #2C0703;
  color: #DA9F93;
}
.second-div {
  margin-bottom: 40px;
  color: #B6465F;
  background: transparent;
}
.third-div {
  background: #eb4511;
}
</style>