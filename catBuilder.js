function draw(container_id, cat_obj) {
    var canvas = document.getElementById(container_id);

    canvas.width = $("#"+container_id).width()
    canvas.height = $("#"+container_id).height()

    let c_width = canvas.width
    let c_height = canvas.height

    let total_height = cat_obj.head_height + cat_obj.ear_height + cat_obj.body_height + cat_obj.neck_length*cat_obj.head_height
    let total_width = Math.max(cat_obj.head_width, cat_obj.body_width+cat_obj.tail_width*2+5) // the +5 is to avoid tail overlaping with body

    let display_ratio = Math.min((c_height-10)/total_height, (c_width-10)/total_width) // the -5 deals with some rounding issues and edge cases

    let head_width = cat_obj.head_width * display_ratio
    let head_height = cat_obj.head_height * display_ratio
    let head_arc = Math.min(head_width, head_height) / 2 * cat_obj.head_arc

    let ear_width = head_width * cat_obj.ear_width
    let ear_height = cat_obj.ear_height * display_ratio
    
    let ear_direction = ear_width * cat_obj.ear_direction
    let ear_offset = cat_obj.ear_offset * ( head_width / 2 - ear_width)

    let eye_height = cat_obj.eye_height // max = 1 
    let eye_width = cat_obj.eye_width // max = 0.5
    let eye_distance = cat_obj.eye_distance // max = 1
    let eye_margin_top = cat_obj.eye_margin_top // max = 1

    let retina_width = cat_obj.retina_width    // max = 0.5
    let retina_height = cat_obj.retina_height  // max = 0.5

    let body_height = cat_obj.body_height * display_ratio
    let body_width = cat_obj.body_width * display_ratio
    let body_arc = cat_obj.body_arc

    let neck_length = cat_obj.neck_length * head_height
    let neck_width = cat_obj.neck_width * Math.min(head_width, body_width)

    let tail_height = cat_obj.tail_height * display_ratio
    let tail_width = cat_obj.tail_width * display_ratio
    let tail_stroke = cat_obj.tail_stroke

    let ear_color = cat_obj.ear_color
    let head_color = cat_obj.head_color
    let eye_color = cat_obj.eye_color
    let retina_color = cat_obj.retina_color
    let neck_color = cat_obj.neck_color
    let body_color = cat_obj.body_color
    let tail_color = cat_obj.tail_color

    const head_margin_left = (c_width - head_width) / 2
    const head_margin_top = (c_height - ear_height - head_height - neck_length - body_height) / 2

    const body_margin_left = (c_width - body_width) / 2
    const body_margin_top = head_margin_top + ear_height + head_height + neck_length

    const left_ear_p1x = head_margin_left + ear_offset
    const left_ear_p1y = head_margin_top + ear_height

    const left_ear_p2x = left_ear_p1x + ear_width
    const left_ear_p2y = left_ear_p1y

    const left_ear_p3x = left_ear_p1x + ear_direction
    const left_ear_p3y = head_margin_top

    const ear_distance = head_width - ear_width

    const right_ear_p1x = left_ear_p1x + ear_distance - 2*ear_offset
    const right_ear_p2x = left_ear_p2x + ear_distance - 2*ear_offset
    const right_ear_p3x = head_width - ear_direction + head_margin_left - ear_offset

    const left_eye_x = head_margin_left + head_width/2 - head_width*(0.5 - eye_width)*eye_distance - head_width*eye_width*0.5
    const left_eye_y = head_margin_top + ear_height + head_height*eye_margin_top

    const right_eye_x = head_margin_left + head_width/2 + head_width*(0.5 - eye_width)*eye_distance + head_width*eye_width*0.5
    const right_eye_y = head_margin_top + ear_height + head_height*eye_margin_top

    let eye_height_pixel
    if(eye_margin_top > 0.5){
        eye_height_pixel = eye_height * head_height * (1 - eye_margin_top) * 2
    }else{
        eye_height_pixel = eye_height * head_height * eye_margin_top * 2
    }
    
    const neck_start_x = head_width/2 + head_margin_left - neck_width/2
    const neck_start_y = head_height + ear_height + head_margin_top

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, c_width, c_height);

    // add a background
    ctx.fillStyle = "white"
    drawRoundRect(ctx, 0, 0, c_width, c_height, 0, true, false)

    // ctx.lineWidth = 5
    // ctx.strokeStyle = "black"
    // drawRoundRect(ctx, 0, 0, c_width, c_height, 0, false, true)
    
    // ears
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black"
    ctx.fillStyle = ear_color
    drawTriangle(ctx, left_ear_p1x, left_ear_p1y + head_arc, left_ear_p2x, left_ear_p2y, left_ear_p3x, left_ear_p3y)
    drawTriangle(ctx, right_ear_p1x, left_ear_p1y, right_ear_p2x, left_ear_p2y + head_arc, right_ear_p3x, left_ear_p3y)
    
    // head
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black"
    ctx.fillStyle = head_color
    drawRoundRect(ctx, head_margin_left, head_margin_top + ear_height, head_width, head_height, head_arc, true, true)

    // eyes
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black"
    drawEye(ctx, left_eye_x, left_eye_y, head_width*eye_width, eye_height_pixel, retina_width, retina_height, eye_color, retina_color)
    drawEye(ctx, right_eye_x, right_eye_y, head_width*eye_width, eye_height_pixel, retina_width, retina_height, eye_color, retina_color)
    
    // neck
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black"
    ctx.fillStyle = neck_color
    drawRoundRect(ctx, neck_start_x, neck_start_y, neck_width, neck_length, 0, true, true)

    // tail
    ctx.strokeStyle = tail_color
    drawTail(ctx, tail_height, tail_width, tail_stroke, body_margin_left + body_width, neck_start_y + neck_length + body_height)

    // body
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black"
    ctx.fillStyle = body_color
    drawBody(ctx, neck_start_x, neck_start_y + neck_length, neck_width, body_margin_left, neck_start_y + neck_length + body_height, body_width, body_arc)
}

function exportCatImage(container_id){
    var image = document.getElementById(container_id).toDataURL("image/png").replace("image/png", "image/octet-stream");

    var a = document.createElement('a');
    a.style.display = "none";
    a.href = image;
    a.download = "cat.png";
    document.body.appendChild(a);
    a.click();
}

function drawEye(ctx, x, y, width, height, r_width, r_height, eye_color, retina_color){
    ctx.beginPath();
    ctx.fillStyle = eye_color
    ctx.ellipse(x, y, width/2, height/2, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()

    ctx.beginPath();
    ctx.fillStyle = retina_color
    ctx.ellipse(x, y, width*r_width, height*r_height, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()
}

function drawTriangle(ctx, p1x ,p1y, p2x, p2y, p3x, p3y){
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.lineTo(p3x, p3y);
    ctx.lineTo(p1x, p1y);
    ctx.fill();
    ctx.stroke();
}

function drawBody(ctx, neck_p1x, neck_p1y, neck_width, body_p1x, body_p1y, body_width, curve_percent){
    ctx.beginPath();
    ctx.moveTo(neck_p1x, neck_p1y)

    let b_height = body_p1y - neck_p1y

    ctx.quadraticCurveTo(body_p1x, body_p1y - b_height*curve_percent, body_p1x, body_p1y)
    
    ctx.moveTo(neck_p1x, neck_p1y)
    ctx.lineTo(neck_p1x + neck_width, neck_p1y)
    
    ctx.quadraticCurveTo(body_p1x + body_width, body_p1y - b_height*curve_percent, body_p1x + body_width, body_p1y)

    ctx.lineTo(body_p1x, body_p1y)
    
    ctx.stroke()
    ctx.fill()
}

function drawTail(ctx, tail_height, tail_width, stroke_width, start_x, start_y){

    ctx.beginPath();
    ctx.moveTo(start_x, start_y)
    ctx.lineWidth = stroke_width;
    ctx.quadraticCurveTo(start_x + 0.5*tail_width, start_y - 0.5*tail_height, start_x + 2, start_y - tail_height)
    ctx.arcTo(start_x, start_y - tail_height - 0.5*tail_width, start_x + 0.5*tail_width, start_y - tail_height - 0.5*tail_width, 0.5*tail_width)
    ctx.arcTo(start_x + tail_width, start_y - tail_height - 0.5*tail_width, start_x + 2 + tail_width, start_y - tail_height, 0.5*tail_width)
    ctx.arcTo(start_x + tail_width, start_y - tail_height + 0.4*tail_width, start_x + 2 + 0.4*tail_width, start_y - tail_height + 0.4*tail_width, 0.4*tail_width)

    ctx.stroke()

}

// https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}