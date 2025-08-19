function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const newestProducts = [
  {
    title: "New Arrival 1",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
          code: `{%- liquid 
  assign padding_horizontal = section.settings.padding_horizontal
  assign padding_horizontal_mobile = section.settings.padding_horizontal_mobile
  assign padding_top = section.settings.padding_top
  assign padding_bottom = section.settings.padding_bottom
  assign border_color = section.settings.border_color
  assign border_thickness = section.settings.border_thickness
  assign margin_top = section.settings.margin_top
  assign margin_bottom = section.settings.margin_bottom
  assign margin_horizontal_mobile = section.settings.margin_horizontal_mobile
  assign margin_horizontal = section.settings.margin_horizontal
  assign background_color = section.settings.background_color
  assign background_gradient = section.settings.background_gradient
  assign full_width = section.settings.full_width
  assign content_width = section.settings.content_width
  assign lazy = section.settings.lazy
  assign section_radius = section.settings.section_radius
  
  assign heading = section.settings.heading
  assign heading_custom = section.settings.heading_custom
  assign heading_font = section.settings.heading_font
  assign heading_size = section.settings.heading_size
  assign heading_size_mobile = section.settings.heading_size_mobile
  assign heading_height = section.settings.heading_height
  assign heading_color = section.settings.heading_color
  assign heading_align = section.settings.heading_align
  assign heading_align_mobile = section.settings.heading_align_mobile

  assign sub_heading = section.settings.sub_heading
  assign sub_heading_custom = section.settings.sub_heading_custom
  assign sub_heading_font = section.settings.sub_heading_font
  assign sub_heading_size = section.settings.sub_heading_size
  assign sub_heading_size_mobile = section.settings.sub_heading_size_mobile
  assign sub_heading_height = section.settings.sub_heading_height
  assign sub_heading_color = section.settings.sub_heading_color
  assign sub_heading_align = section.settings.sub_heading_align
  assign sub_heading_align_mobile = section.settings.sub_heading_align_mobile
  assign sub_heading_mt = section.settings.sub_heading_mt
  assign sub_heading_mt_mobile = section.settings.sub_heading_mt_mobile

  assign images_gap = section.settings.images_gap
  assign images_gap_mobile = section.settings.images_gap_mobile
  assign images_radius = section.settings.images_radius
  assign images_mt = section.settings.images_mt
  assign images_mt_mobile = section.settings.images_mt_mobile
  assign images_position = section.settings.images_position
  assign images_position_mobile = section.settings.images_position_mobile

  assign main_image_url = section.settings.main_image_url
  assign main_image = section.settings.main_image
  assign main_image_width = section.settings.main_image_width

  assign small_images_row = section.settings.small_images_row
  assign small_images_row_mobile = section.settings.small_images_row_mobile

  assign image_overlay = section.settings.image_overlay
-%}

{%- style -%}
  {{ heading_font | font_face: font_display: 'swap' }}
  {{ sub_heading_font | font_face: font_display: 'swap' }}

  .section-{{ section.id }} {
    border-top: solid {{ border_color }} {{ border_thickness }}px;
    border-bottom: solid {{ border_color }} {{ border_thickness }}px;
    margin-top: {{ margin_top | times: 0.75 | round: 0 }}px;
    margin-bottom: {{ margin_bottom | times: 0.75 | round: 0 }}px;
    margin-left: {{ margin_horizontal_mobile }}rem;
    margin-right: {{ margin_horizontal_mobile }}rem;
    border-radius: {{ section_radius | times: 0.6 | round: 0 }}px;
    overflow: hidden;
  }
  
  .section-{{ section.id }}-settings {
    margin: 0 auto;
    padding-top: {{ padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ padding_bottom | times: 0.75 | round: 0 }}px;
    padding-left: {{ padding_horizontal_mobile }}rem;
    padding-right: {{ padding_horizontal_mobile }}rem;
  }

  .gallery-heading-{{ section.id }} {
    text-align: {{ heading_align_mobile }};
  }

  .gallery-heading-{{ section.id }} * {
    margin: 0;
    font-size: {{ heading_size_mobile }}px;
    color: {{ heading_color }};
    line-height: {{ heading_height }}%;
    text-transform: unset;
    text-decoration: none;
  }

  .gallery-subheading-{{ section.id }} {
    text-align: {{ sub_heading_align_mobile }};
    margin-top: {{ sub_heading_mt_mobile }}px;
  }

  .gallery-subheading-{{ section.id }} * {
    margin: 0;
    font-size: {{ sub_heading_size_mobile }}px;
    color: {{ sub_heading_color }};
    line-height: {{ sub_heading_height }}%;
    text-transform: unset;
    text-decoration: none;
  }

  .gallery-body-{{ section.id }} {
    display: flex;
    justify-content: space-between;
    flex-direction: {{ images_position_mobile }};
    margin-top: {{ images_mt_mobile }}px;
    gap: {{ images_gap_mobile }}px
  }

  .gallery-main-image-{{ section.id }} {
    display: block;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: {{ images_radius }}px;
  }

  .gallery-main-image-{{ section.id }} img,
  .gallery-main-image-{{ section.id }} svg {
    display: block;
    width: 100%;
    height: 100%;    
    object-fit: cover;
  }

  .gallery-main-image-{{ section.id }} svg {
    background: #AFAFAF;
  }

  .gallery-all-{{ section.id }} {
    display: grid;
    grid-template-columns: repeat({{ small_images_row_mobile }}, 1fr);
    gap: {{ images_gap_mobile }}px;
    width: 100%;
  }

  .gallery-all-image-{{ section.id }} {
    display: block;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: {{ images_radius }}px;
  }

  .gallery-all-image-{{ section.id }} img,
  .gallery-all-image-{{ section.id }} svg {
    display: block;
    width: 100%;
    height: 100%;    
    object-fit: cover;    
  }

  .gallery-all-image-{{ section.id }} svg {
    background: #ababab;
  }

  .gallery-all-item-desktop-{{ section.id }} {
    display: none;
  }

  @media(min-width: 1024px) {

    .section-{{ section.id }} {
      margin-top: {{ margin_top }}px;
      margin-bottom: {{ margin_bottom }}px;
      margin-left: {{ margin_horizontal }}rem;
      margin-right: {{ margin_horizontal }}rem;
      border-radius: {{ section_radius }}px;
    }
    
    .section-{{ section.id }}-settings {
      padding: 0 5rem;
      padding-top: {{ padding_top }}px;
      padding-bottom: {{ padding_bottom }}px;
      padding-left: {{ padding_horizontal }}rem;
      padding-right: {{ padding_horizontal }}rem;
    }

    .gallery-heading-{{ section.id }} {
      text-align: {{ heading_align }};
    }
  
    .gallery-heading-{{ section.id }} * {
      font-size: {{ heading_size }}px;
    }   

    .gallery-subheading-{{ section.id }} {
      margin-top: {{ sub_heading_mt }}px;
      text-align: {{ sub_heading_align }};
    }
  
    .gallery-subheading-{{ section.id }} * {
      font-size: {{ sub_heading_size }}px;
    } 

    .gallery-body-{{ section.id }} { 
      flex-direction: {{ images_position }};
      margin-top: {{ images_mt }}px;
      gap: {{ images_gap }}px
    }

    .gallery-main-{{ section.id }} {
      flex: 0 1 calc({{ main_image_width }}% - ( {{ images_gap }}px / 2));
    }

    .gallery-main-image-{{ section.id }}::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: {{ image_overlay |  hex_to_rgba: 0.5 }};
      opacity: 0;
      transition: all 0.25s ease 0s;
    }

    .gallery-main-image-{{ section.id }}:hover::after {
      opacity: 1;
    }

    .gallery-all-{{ section.id }} {
      gap: {{ images_gap }}px;
      grid-template-columns: repeat({{ small_images_row }}, 1fr);
      width: {{ 100 | minus: main_image_width}}%;
    }

    .gallery-all-image-{{ section.id }}::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: {{ image_overlay |  hex_to_rgba: 0.5 }};
      opacity: 0;
      transition: all 0.25s ease 0s;
    }
    
    .gallery-all-image-{{ section.id }}:hover::after {
      opacity: 1;
    }

    .gallery-all-item-desktop-{{ section.id }} {
      display: block;
    }
  }
  
{%- endstyle -%}

{% unless full_width %}
  <style>
    .section-{{ section.id }}-settings {
      max-width: {{ content_width }}px;
    }
  </style>
{% endunless %}

{% if margin_horizontal_mobile > 0 %}
  <style>
    .section-{{ section.id }} {
      border-left: solid {{ border_color }} {{ border_thickness }}px;
      border-right: solid {{ border_color }} {{ border_thickness }}px;
    }
    
    @media(min-width: 1024px) {
      .section-{{ section.id }} {
        border-left: 0px;
        border-right: 0px;
      }
    }
  </style>
{% endif %}

{% if margin_horizontal > 0 %}
  <style>
    @media(min-width: 1024px) {
      .section-{{ section.id }} {
        border-left: solid {{ border_color }} {{ border_thickness }}px;
        border-right: solid {{ border_color }} {{ border_thickness }}px;
      }
    }
  </style>
{% endif %}

{% if heading_custom %}
  <style>
    .gallery-heading-{{ section.id }} * {
      font-family: {{ heading_font.family }}, {{ heading_font.fallback_families }};
      font-weight: {{ heading_font.weight }};
      font-style: {{ heading_font.style }};
    }
  </style>
{% endif %}

{% if sub_heading_custom %}
  <style>
    .gallery-subheading-{{ section.id }} * {
      font-family: {{ sub_heading_font.family }}, {{ sub_heading_font.fallback_families }};
      font-weight: {{ sub_heading_font.weight }};
      font-style: {{ sub_heading_font.style }};
    }
  </style>
{% endif %}

<div class="section-{{ section.id }} gallery-{{ section.id }}" style="background-color:{{ background_color }}; background-image: {{ background_gradient }};">
    <div class="section-{{ section.id }}-settings">
      <div class="gallery-title-{{ section.id }}">
        {% if heading %}
          <div class="gallery-heading-{{ section.id }}">
            {{ heading }}
          </div>
        {% endif %}
        {% if sub_heading %}
          <div class="gallery-subheading-{{ section.id }}"> 
            {{ sub_heading }}
          </div>        
        {% endif %}
      </div>
      <div class="gallery-body-{{ section.id }}">
        <div class="gallery-main-{{ section.id }}">
          <{% if main_image_url != blank %}a href="{{ main_image_url.url }}"{% else %}div{% endif %} class="gallery-main-image-{{ section.id }}"> 
            {% if main_image != blank %}
              <img src="{{ main_image | image_url }}" alt="{{ main_image.alt }}" {% if lazy %}loading="lazy"{% endif %}">
            {% else %}
              {{ 'image' | placeholder_svg_tag }}
            {% endif %}   
          </{% if main_image_url != blank %}a{% else %}div{% endif %}>     
        </div>
        <div class="gallery-all-{{ section.id }}">
          {% for block in section.blocks %}
            <div class="gallery-all-item-{{ section.id }} {% if block.settings.hide_mobile %}gallery-all-item-desktop-{{ section.id }}{% endif %}">
              <{% if block.settings.url != blank %}a href="{{ block.settings.url.url }}"{% else %}div{% endif %} class="gallery-all-image-{{ section.id }}"> 
                {% if block.settings.image != blank %}
                  <img src="{{ block.settings.image | image_url }}" alt="{{ block.settings.image.alt }}" {% if lazy %}loading="lazy"{% endif %}">
                {% else %}
                  {{ 'image' | placeholder_svg_tag }}
                {% endif %}   
              </{% if block.settings.url != blank %}a{% else %}div{% endif %}>    
            </div>
          {% endfor %}
        </div>
      </div>
    </div>
</div>

{% schema %}
  {
    "name": "SS - Gallery #1",
    "settings": [
      {
        "type": "header",
        "content": "Heading settings"
      },
      {
        "type": "richtext",
        "id": "heading",
        "label": "Text",
        "default": "<h2>Gallery #1</h2>"
      },
      {
        "type": "checkbox",
        "id": "heading_custom",
        "label": "Use custom font",
        "default": false
      },
      {
        "type": "font_picker",
        "id": "heading_font",
        "label": "Font family",
        "default": "josefin_sans_n4"
      },
      {
        "type": "range",
        "id": "heading_size",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Font size",
        "default": 32
      },
      {
        "type": "range",
        "id": "heading_size_mobile",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Font size - mobile",
        "default": 28
      },
      {
        "type": "range",
        "id": "heading_height",
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "%",
        "label": "Line height",
        "default": 130
      },
      {
        "type": "text_alignment",
        "id": "heading_align",
        "label": "Alignment",
        "default": "center"
      },
      {
        "type": "text_alignment",
        "id": "heading_align_mobile",
        "label": "Alignment - mobile",
        "default": "center"
      },
      {
        "type": "header",
        "content": "Subheading settings"
      },
      {
        "type": "richtext",
        "id": "sub_heading",
        "label": "Text",
        "default": "<p>Subheading</p>"
      },
      {
        "type": "checkbox",
        "id": "sub_heading_custom",
        "label": "Use custom font",
        "default": false
      },
      {
        "type": "font_picker",
        "id": "sub_heading_font",
        "label": "Font family",
        "default": "josefin_sans_n4"
      },
      {
        "type": "range",
        "id": "sub_heading_size",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Font size",
        "default": 16
      },
      {
        "type": "range",
        "id": "sub_heading_size_mobile",
        "min": 0,
        "max": 72,
        "step": 2,
        "unit": "px",
        "label": "Font size - mobile",
        "default": 16
      },
      {
        "type": "range",
        "id": "sub_heading_height",
        "min": 50,
        "max": 200,
        "step": 10,
        "unit": "%",
        "label": "Line height",
        "default": 130
      },
      {
        "type": "range",
        "id": "sub_heading_mt",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Margin top",
        "default": 16
      },
      {
        "type": "range",
        "id": "sub_heading_mt_mobile",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Margin top - mobile",
        "default": 16
      },
      {
        "type": "text_alignment",
        "id": "sub_heading_align",
        "label": "Alignment",
        "default": "center"
      },
      {
        "type": "text_alignment",
        "id": "sub_heading_align_mobile",
        "label": "Alignment - mobile",
        "default": "center"
      },    
      {
        "type": "header",
        "content": "Images settings"
      },  
      {
        "type": "range",
        "id": "images_gap",
        "min": 0,
        "max": 100,
        "step": 2,
        "label": "Gap",
        "default": 10
      },
      {
        "type": "range",
        "id": "images_gap_mobile",
        "min": 0,
        "max": 100,
        "step": 2,
        "label": "Gap - mobile",
        "default": 10
      },  
      {
        "type": "range",
        "id": "images_radius",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Roundness",
        "default": 4
      },
      {
        "type": "select",
        "id": "images_position",
        "label": "Position",
        "default": "row",
        "options": [
          {
            "label": "Left main image",
            "value": "row"
          },
          {
            "label": "Right main image",
            "value": "row-reverse"
          }
        ]
      }, 
      {
        "type": "select",
        "id": "images_position_mobile",
        "label": "Position - mobile",
        "default": "column",
        "options": [
          {
            "label": "Main image on top",
            "value": "column"
          },
          {
            "label": "Main image at the bottom",
            "value": "column-reverse"
          }
        ]
      }, 
      {
        "type": "range",
        "id": "images_mt",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Margin top",
        "default": 32
      },
      {
        "type": "range",
        "id": "images_mt_mobile",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Margin top - mobile",
        "default": 24
      },     
      {
        "type": "header",
        "content": "Main image settings"
      },
      {
        "type": "image_picker",
        "id": "main_image",
        "label": "Image"
      },
      {
        "type": "url",
        "id": "main_image_url",
        "label": "URL"
      },
      {
        "type": "range",
        "id": "main_image_width",
        "min": 30,
        "max": 60,
        "step": 2,
        "unit": "%",
        "label": "Width - desktop",
        "default": 40
      },
      {
        "type": "header",
        "content": "Small image settings"
      },
      {
        "type": "range",
        "id": "small_images_row",
        "min": 2,
        "max": 4,
        "step": 1,
        "label": "Small images per row",
        "default": 3
      },
      {
        "type": "range",
        "id": "small_images_row_mobile",
        "min": 2,
        "max": 4,
        "step": 1,
        "label": "Small images per row - mobile",
        "default": 2
      },
      {
        "type": "header",
        "content": "Section colors"
      },     
      {
        "type": "color",
        "label": "Heading",
        "id": "heading_color",
        "default": "#000000"
      }, 
      {
        "type": "color",
        "label": "Subheading",
        "id": "sub_heading_color",
        "default": "#000000"
      }, 
      {
        "type": "color",
        "label": "Image overlay",
        "id": "image_overlay",
        "default": "#000000"
      },  
      {
        "type": "color",
        "label": "Section background",
        "id": "background_color",
        "default": "#FFFFFF"
      },
      {
        "type": "color_background",
        "id": "background_gradient",
        "label": "Section background gradient",
        "info": "Remove gradient to replace with solid colors"
      },
      {
        "type": "color",
        "label": "Border",
        "id": "border_color",
        "default": "#000000"
      },
      {
        "type": "header",
        "content": "Section margin (outside)"
      },
      {
        "type": "range",
        "id": "margin_top",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Margin top",
        "default": 0
      },
      {
        "type": "range",
        "id": "margin_bottom",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Margin bottom",
        "default": 0
      },
      {
        "type": "range",
        "id": "margin_horizontal",
        "min": 0,
        "max": 30,
        "step": 1,
        "unit": "rem",
        "label": "Margin sides",
        "default": 0
      },
      {
        "type": "range",
        "id": "margin_horizontal_mobile",
        "min": 0,
        "max": 15,
        "step": 0.5,
        "unit": "rem",
        "label": "Margin sides mobile",
        "default": 0
      },
      {
        "type": "header",
        "content": "Section padding (inside)"
      },
      {
        "type": "range",
        "id": "padding_top",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Padding top",
        "default": 36
      },
      {
         "type": "range",
         "id": "padding_bottom",
         "min": 0,
         "max": 100,
         "step": 4,
         "unit": "px",
         "label": "Padding bottom",
         "default": 36
      },
      {
        "type": "range",
        "id": "padding_horizontal",
        "min": 0,
        "max": 30,
        "step": 1,
        "unit": "rem",
        "label": "Padding sides",
        "default": 5
      },
      {
        "type": "range",
        "id": "padding_horizontal_mobile",
        "min": 0,
        "max": 15,
        "step": 0.5,
        "unit": "rem",
        "label": "Padding sides mobile",
        "default": 1.5
      },
      {
        "type": "header",
        "content": "Section settings"
      },
      {
        "type": "checkbox",
        "id": "full_width",
        "label": "Full width",
        "default": false
      },
      {
        "type": "range",
        "id": "content_width",
        "min": 800,
        "max": 2000,
        "step": 100,
        "unit": "px",
        "label": "Section content width",
        "default": 1200
      },
      {
        "type": "range",
        "id": "border_thickness",
        "min": 0,
        "max": 50,
        "step": 1,
        "unit": "px",
        "label": "Border thickness",
        "default": 0
      },
      {
        "type": "range",
        "id": "section_radius",
        "min": 0,
        "max": 100,
        "step": 2,
        "unit": "px",
        "label": "Section roundness",
        "default": 0
      },
      {
        "type": "checkbox",
        "id": "lazy",
        "label": "Lazy load",
        "info": "Lazy load images for speed optimisation",
        "default": true
      }
    ],
    "blocks": [
    {
      "type": "image",
      "name": "Image",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "url",
          "id": "url",
          "label": "URL"
        },
        {
          "type": "checkbox",
          "id": "hide_mobile",
          "label": "Hide on mobile"
        }
      ]
    }
  ],
    "presets": [
    {
      "name": "SS - Gallery #1",
      "blocks": [
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        }
      ]
    }
  ]
  }
{% endschema %}`,  },
  {
    title: "New Arrival 2",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "video",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "hello world",
  },
  {
    title: "New Arrival 3",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",

    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "hello world",
  },
  {
    title: "New Arrival 4",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "hello world",
  },
  {
    title: "New Arrival 5",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 6",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 7",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 8",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 9",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 10",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 11",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
  {
    title: "New Arrival 12",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: "<div>hello world</div>",
  },
];

export const sectionsCatalog = newestProducts.map((item) => ({
  title: item.title,
  imageUrl: item.media,
  sectionHandle: slugify(item.title),
  code: item.code,
}));
