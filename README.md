# html-canvas-cat-generator
A canvas-based 2D cat generator with the capability of being animated.

## Live Demo
Cat Generator: https://ai8hyf.github.io/html-canvas-cat-generator/index

Cat Animator: https://ai8hyf.github.io/html-canvas-cat-generator/feed

## Usage
Include the following libraries:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="catBuilder.js"></script>
```

To generate a cat, you need to pass the target canvas (like "#cat-container") and the following object (Json) to the **draw()** function:

```
let catObj = {
    "head_width": 50 ~ 300 (int),
    "head_height": 50 ~ 200 (int), 
    "head_arc": 0 ~ 1 (float),
    "ear_width": 0 ~ 0.5 (float),
    "ear_height": 0 ~ 1 (float), 
    "ear_direction": 0 ~ 1 (float),
    "ear_offset": 0 ~ 1 (float),
    "eye_height": 0 ~ 1 (float),
    "eye_width": 0 ~ 0.5 (float),
    "eye_distance": 0 ~ 1 (float),
    "eye_margin_top": 0 ~ 1 (float),
    "retina_width": 0 ~ 0.5 (float),
    "retina_height": 0 ~ 0.5 (float),
    "neck_length": 0 ~ 2 (float),
    "neck_width": 0 ~ 1 (float),
    "body_height": 50 ~ 300 (int),
    "body_width": 50 ~ 300 (int),
    "body_arc": 0 ~ 100 (int),
    "tail_height": 0 ~ 100 (int),
    "tail_width": 20 ~ 40 (int),
    "tail_stroke": 0 ~ 10 (int),
    "ear_color": hex,
    "head_color": hex,
    "eye_color": hex,
    "retina_color": hex,
    "neck_color": hex,
    "body_color": hex,
    "tail_color": hex,
}
```

```
draw("#cat-container", catObj)
```


You can always customize the ranges. However, make sure there are no negative values in the json. 

Check out the demo code (index.html and demo.css) for more details!
