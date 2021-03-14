import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';
import '../imports/client/lib/routes';
import '../imports/both/lib/collections';
// import '../node_modules/materialize-css/sass/materialize.scss';
import '../imports/client/styles/social.css';
// import '../node_modules/materialize-css/dist/js/materialize.min';

// import 'daemonite-material/css/material.css'
// import 'daemonite-material/js/material'



// require('fs')
require("jquery-ui-sortable");
require("formBuilder");
// require('formbuilder-languages');
import 'formBuilder/dist/form-render.min'

import './main.html';

var formBuilder;
// var formRender = new ReactiveVar()

Template.body.onRendered(() => {

    // $('.sidenav').sidenav();
    // $('.collapsible').collapsible();
    // $(document.getElementById('fb-editor')).formBuilder();

    var options = {
        actionButtons: [{}],
        disabledActionButtons: ['data', 'save', 'clear'],
        i18n: {
            locale: 'pt-BR'
            //location: 'http://languagefile.url/directory/'
            //extension: '.ext'
            //override: {
            //    'en-US': {...}
            //}
        },

        layoutTemplates: {
            help: function (helpText) {
                return $('<div/>')
                    .addClass('help')
                    .append(helpText);
            },
            label: function (label, data) {

                // cheeky styling
                return $('<label class="bright" style="margin-top:15px;"/>')
                    .attr('for', data.id)
                    .append(label);
            }
        }
    };

    var fields = [{
        label: "Email",
        type: "text",
        subtype: "email",
        icon: "✉"
    }];

    var fbEditor = document.getElementById('fb-editor');
    formBuilder = $(fbEditor).formBuilder(options);
    //   formBuilder.actions.setLang('pt-BR')
});

Template.body.helpers({
    forms() {
        return Forms.find({}, {sort: {epoch: -1}});
    },

    formsRender(data) {
        const code = document.getElementById(data._id);
        const formData = data.data;
        const addLineBreaks = html => html.replace(new RegExp("><", "g"), ">\n<");
        var container = document.getElementById('my-form');
        formRenderOpts = {
            dataType: 'json',
            formData: formData,
            // layoutTemplates: {
            //     default: function (field, label, help, data) {
            //         field = $('<input/>')
            //             .addClass('form-control')
            //             .attr('id', data.id)
            //             .attr('name', data.id)
            //             .attr('type', 'text')
            //             .attr('placeholder', 'blablabla')
            //             .append(field);
            //         return $('<div class="mb-3">').append(field, label);
            //     }
            // }
        }

        var renderedForm = $('<div class="teste">');
        renderedForm.formRender(formRenderOpts);

        console.log(renderedForm.html());
        part1 = renderedForm.html().split('<div class="rendered-form">')
        part2 = part1[1].split('</div>')
        part3 = part2[0] + part2[1]
        console.log(part3);
        return renderedForm.html()
    }
})

Template.body.events({
    'click #getJson'(e) {
        e.preventDefault()
        console.log(formBuilder.actions.getData('json'))
        // formRender.set(formBuilder.actions.getData('json'))
    },

    'click #getJS'(e) {
        e.preventDefault()
        console.log(formBuilder.actions.getData());
    },

    'click #renderForm'(e) {
        e.preventDefault()
        var fbRender = document.getElementById('fb-render')
        formData = formBuilder.actions.getData('json')
        console.log(formData);
        var formRenderOpts = {
            formData,
            dataType: 'json'
        };

        $('#fb-render').formRender(formRenderOpts);
    },

    'click #saveForm'(e) {
        e.preventDefault()
        Meteor.call('saveFormTemplate', formBuilder.actions.getData('json'))
    }
})