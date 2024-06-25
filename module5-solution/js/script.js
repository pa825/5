// Wrap in an IIFE
(function (global) {
    var dc = {};
  
    // URLs and snippets
    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
  
    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
      var targetElem = document.querySelector(selector);
      targetElem.innerHTML = html;
    };
  
    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
      var html = "<div class='text-center'>";
      html += "<img src='images/ajax-loader.gif'></div>";
      insertHtml(selector, html);
    };
  
    // Return substitute of '{{propName}}' with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
      var propToReplace = "{{" + propName + "}}";
      string = string.replace(new RegExp(propToReplace, "g"), propValue);
      return string;
    };
  
    // Choose a random category from the array of categories
    function chooseRandomCategory(categories) {
      var randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    }
  
    // Load the home page with a random category substituted
    function loadRandomCategory() {
      $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
        var chosenCategory = chooseRandomCategory(categories);
        $ajaxUtils.sendGetRequest(homeHtml, function (homeHtml) {
          var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategory.short_name + "'");
          insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
        }, false);
      });
    }
  
    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
      showLoading("#main-content");
      loadRandomCategory();
    });
  
    global.$dc = dc;
  
  })(window);
  