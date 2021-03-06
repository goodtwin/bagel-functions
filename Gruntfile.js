/*global module, require*/
module.exports = function (grunt) {
  'use strict';

  var globalConfig = {
    src: 'init.scss',
    dist: 'init.css'
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('./package.json'),
    shared_config: {
      style: {
        options: {
          name: "defaultConfig",
          cssFormat: "dash",
          useSassMaps: true
        },
        src: "config.yml",
        dest: [
          "config.scss"
        ]
      }
    },
    sass: {
      dist: {
        files : {
          '<%= globalConfig.dist %>': '<%= globalConfig.src %>'
        }
      }
    },
    myth: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          '<%= globalConfig.dist %>': '<%= globalConfig.dist %>'
        }
      }
    },
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['distcss']
      }
    },
    dss: {
      docs: {
        files: {
          'dist/docs/': './*.css'
        },
        options: {
          css_include: '../../init.css'
        }
      }
    }
  });

require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['build']);
grunt.registerTask('distcss', ['sass:dist', 'myth:dist']);
grunt.registerTask('build', ['shared_config', 'distcss']);

};
