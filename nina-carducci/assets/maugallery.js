(function ($) {
  // Définition du plugin jQuery 'mauGallery'
  $.fn.mauGallery = function (options) {
    // Fusion des options par défaut avec celles spécifiées par l'utilisateur
    var options = $.extend($.fn.mauGallery.defaults, options);
    var tagsCollection = [];

    return this.each(function () {
      // Créer un conteneur de ligne pour les éléments de la galerie
      $.fn.mauGallery.methods.createRowWrapper($(this));

      // Si l'option lightBox est activée, créer la lightbox
      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox(
          $(this),
          options.lightboxId,
          options.navigation
        );
      }

      // Configurer les écouteurs d'événements pour la galerie
      $.fn.mauGallery.listeners(options);

      // Pour chaque élément de la galerie, appliquer les méthodes nécessaires
      $(this)
        .children(".gallery-item")
        .each(function (index) {
          // Rendre l'image responsive
          $.fn.mauGallery.methods.responsiveImageItem($(this));
          // Déplacer l'élément dans le conteneur de ligne
          $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
          // Envelopper l'élément dans une colonne
          $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);

          // Collecter les tags des éléments de la galerie
          var theTag = $(this).data("gallery-tag");
          if (
            options.showTags &&
            theTag !== undefined &&
            tagsCollection.indexOf(theTag) === -1
          ) {
            tagsCollection.push(theTag);
          }
        });

      // Si l'affichage des tags est activé, les afficher
      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags(
          $(this),
          options.tagsPosition,
          tagsCollection
        );
      }

      // Faire apparaître la galerie avec un effet de fondu
      $(this).fadeIn(500);
    });
  };

  // Définition des options par défaut
  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true,
  };

  // Définition des écouteurs d'événements pour la galerie
  $.fn.mauGallery.listeners = function (options) {
    // Gestion du clic sur un élément de la galerie
    $(".gallery-item").on("click", function () {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    // Filtrage des éléments par tag
    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);

    // Navigation dans la lightbox (image précédente)
    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(options.lightboxId)
    );

    // Navigation dans la lightbox (image suivante)
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };

  // Définition des méthodes pour la galerie
  $.fn.mauGallery.methods = {
    // Créer un conteneur de ligne pour les éléments de la galerie
    createRowWrapper(element) {
      if (!element.children().first().hasClass("row")) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },

    // Envelopper un élément dans une colonne, selon le nombre de colonnes spécifié
    wrapItemInColumn(element, columns) {
      if (columns.constructor === Number) {
        element.wrap(
          `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
        );
      } else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    },

    // Déplacer l'élément dans le conteneur de ligne
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },

    // Rendre l'image responsive en ajoutant la classe 'img-fluid'
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },

    // Ouvrir la lightbox et afficher l'image sélectionnée
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },

    // Afficher l'image précédente dans la lightbox
    prevImage() {
      let activeImage = null;
      // Identifier l'image active
      $("img.gallery-item").each(function () {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });

      // Récupérer le tag actif
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];

      // Collectionner les images selon le tag actif
      if (activeTag === "all") {
        $(".item-column").each(function () {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function () {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }

      // Déterminer l'image précédente
      let index = 0,
        next = null;
      $(imagesCollection).each(function (i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i;
        }
      });
      index = (index - 1) % imagesCollection.length;
      next =
        imagesCollection[index] ||
        imagesCollection[imagesCollection.length - 1];

      // Mettre à jour l'image dans la lightbox
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },

    // Afficher l'image suivante dans la lightbox
    nextImage() {
      let activeImage = null;
      // Identifier l'image active
      $("img.gallery-item").each(function () {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });

      // Récupérer le tag actif
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];

      // Collectionner les images selon le tag actif
      if (activeTag === "all") {
        $(".item-column").each(function () {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function () {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }

      // Déterminer l'image suivante
      let index = 0,
        next = null;
      $(imagesCollection).each(function (i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i;
        }
      });
      index = (index + 1) % imagesCollection.length;
      next = imagesCollection[index] || imagesCollection[0];

      // Mettre à jour l'image dans la lightbox
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },

    // Créer et afficher la lightbox
    createLightBox(gallery, lightboxId, navigation) {
      gallery.append(`<div class="modal fade" id="${
        lightboxId ? lightboxId : "galleryLightbox"
      }" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-body">
                          ${
                            navigation
                              ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                              : '<span style="display:none;" />'
                          }
                          <img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>
                          ${
                            navigation
                              ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                              : '<span style="display:none;" />'
                          }
                      </div>
                  </div>
              </div>
          </div>`);
    },

    // Afficher les tags de filtrage des images
    showItemTags(gallery, position, tags) {
      var tagItems =
        '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
      $.each(tags, function (index, value) {
        tagItems += `<li class="nav-item active">
              <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
      });
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

      // Afficher les tags en haut ou en bas de la galerie selon l'option
      if (position === "bottom") {
        gallery.append(tagsRow);
      } else if (position === "top") {
        gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: ${position}`);
      }
    },

    // Filtrer les éléments de la galerie selon le tag sélectionné
    filterByTag() {
      if ($(this).hasClass("active-tag")) {
        return;
      }

      // Changer le tag actif
      $(".active-tag").removeClass("active active-tag");
      $(this).addClass("active active-tag");
      var tag = $(this).data("images-toggle");

      // Montrer ou cacher les éléments en fonction du tag
      $(".gallery-item").each(function () {
        $(this).parents(".item-column").hide();
        if (tag === "all") {
          $(this).parents(".item-column").show(300);
        } else if ($(this).data("gallery-tag") === tag) {
          $(this).parents(".item-column").show(300);
        }
      });
    },
  };
})(jQuery);
