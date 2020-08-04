# Getting Started

### installation

you can install the directive using npm:

```
npm install tvl-contrast-directive --save-dev
```
After installation the directive has to be registered or globaly in your vue application, or localy in a specific SFC (single file component).

### global registration

modify your main.js adding the global directive registration:

``` js
import TvlContrastDirective from 'tvl-contrast-directive'
import Vue from 'vue'

Vue.directive('contrast', TvlContrastDirective)

// ... the rest of code here
```
### local registration

Import the directive from the npm package and add ```directives``` option into the configuration object in your SFC:

``` js
<script>
import TvlContrastDirective from 'tvl-contrast-directive'
export default {
  name: 'myComponent',
  props: {
    // ...
  },
  directives: {
    contrast: TvlContrastDirective
  },
    // ...
}
</script>
```

### usage
::: warning
  __don't use in production.__  
  The directive was written as a developer's helping tool and it is supposed to be used in development only.
:::

Once the directive is registered, it can be set in a HTML element or a vue component as ```v-contrast```:

``` html
<div v-contrast class="container">I am a container div.</div>
```

### functionality

* The directive shows the contrast ratio of the HTML element. It can be helpful in development, if you need to check quickly the contrast on a component, especially when the colors are set dynamically.
* The contrast ratio is calculated according to the WCAG 2.0 and 2.1 standards.
* The directive appends an information sheet below the element. It shows the contrast ratio value and a short text saying that the contrast meets the WCAG criteria or that it doesn't. If the calculation fails for any reason this information sheet contains an error message.
* Two values are used in the contrast ratio calculation - ```background-color``` and ```color``` css properties. If any of these values is not set on the element itself, then the inherited value of the closest ancestor applies on the element. The directive finds the closest defined ancestor's value if this is a case.
* The closest exactly defined ancestor's value is used also if the element's background collor is set to ```transparent``` / ```rgba(0, 0, 0, 0)```.
* The information sheet displayed below the element doesn't offer any hiding, closing, removing functionality. It can not be removed. It remains visible as long as the element remains in the DOM. This can help not to forget to remove the directive out of the element before building for production :-).
