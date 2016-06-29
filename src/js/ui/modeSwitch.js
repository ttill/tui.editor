/**
 * @fileoverview
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var UIController = require('./uicontroller');

var util = tui.util;

var TYPE = {
    MARKDOWN: 'markdown',
    WYSIWYG: 'wysiwyg'
};


/**
 * ModeSwitch
 * UI Control for switch between Markdown and WYSIWYG
 * @exports ModeSwitch
 * @augments UIController
 * @constructor
 * @class
 * @param {number} initialType initial type of editor
 */
function ModeSwitch(initialType) {
    UIController.call(this, {
        tagName: 'div',
        className: 'te-mode-switch'
    });

    this._render();
    this._switchType(util.isExisty(initialType) ? initialType : TYPE.MARKDOWN);
}

ModeSwitch.prototype = util.extend(
    {},
    UIController.prototype
);

ModeSwitch.prototype._render = function() {
    this.$buttons = {};
    this.$buttons.markdown = $('<button class="te-switch-button markdown" type="button">Markdown</button>');
    this.$buttons.wysiwyg = $('<button class="te-switch-button wysiwyg" type="button">WYSIWYG</button>');
    this.$el.append(this.$buttons.markdown);
    this.$el.append(this.$buttons.wysiwyg);

    this.attachEvents({
        'click .markdown': '_changeMarkdown',
        'click .wysiwyg': '_changeWysiwyg'
    });
};

ModeSwitch.prototype._changeMarkdown = function(e) {
    this._switchType(TYPE.MARKDOWN);
};

ModeSwitch.prototype._changeWysiwyg = function() {
    this._switchType(TYPE.WYSIWYG);
};

ModeSwitch.prototype._setActiveButton = function(type) {
    util.forEach(this.$buttons, function($button) {
        $button.removeClass('active');
    });
    this.$buttons[type].addClass('active');
};


ModeSwitch.prototype._switchType = function(type) {
    if(this.type === type) {
        return;
    }

    this.type = type;
    this._setActiveButton(type);
    this.trigger('modeSwitched', this.type);
};

ModeSwitch.TYPE = TYPE;

module.exports = ModeSwitch;