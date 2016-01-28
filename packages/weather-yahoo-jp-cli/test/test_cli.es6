/* global describe it */

"use strict";

import "./test_helper";
import "mocha";
import {assert} from "chai";

import cli from "../src/main";

describe("CLI", function(){

  it('should have method "handler"', function(){
    assert.isFunction(cli.handler);
  });

});