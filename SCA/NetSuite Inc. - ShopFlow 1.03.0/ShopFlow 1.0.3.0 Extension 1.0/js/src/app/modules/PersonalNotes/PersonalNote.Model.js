// PersonalNote.Model.js
// -----------------------
// Model for handling PersonalNotes (CRUD)
define('PersonalNote.Model', function ()
{
    'use strict';

    return Backbone.Model.extend({

        urlRoot: 'services/personalnote.ss'

        ,	validation: {
            personalNote: { required: true, msg: _('Please enter some note').translate() }
        }

        ,   validate: function(attributes) {
            if ( attributes.personalNote === '') {
                return _('Please enter some note').translate();
            }
        }
    });
});
