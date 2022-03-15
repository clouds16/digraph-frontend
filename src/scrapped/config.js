// @flow
/*
  Copyright(c) 2018 Uber Technologies, Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
          http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Example config for GraphView component
*/
import React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes

export const SERVER_TYPE = "server";
export const DATABASE_TYPE = "database";
export const BROWSER_TYPE = "browser";
export const TEXTTRACT_TYPE = "textract";
export const LAMBDA_TYPE = "lambda";
export const LOGIN_TYPE = "login";
export const CUSTOM_EMPTY_TYPE ="empty";
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";
export const SPECIAL_EDGE_TYPE_REVERSE = "specialEdgeReverse";

export const nodeTypes = [
  TEXTTRACT_TYPE,
  DATABASE_TYPE,
  BROWSER_TYPE,
  SERVER_TYPE,
  LAMBDA_TYPE,
  LOGIN_TYPE
];
export const edgeTypes = [
  EMPTY_EDGE_TYPE,
  SPECIAL_EDGE_TYPE,
  SPECIAL_EDGE_TYPE_REVERSE
];

const ServerShape = (
  <symbol viewBox="0 0 88 72" id="server" width="88" height="88">
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const DatabaseShape = (
  <symbol viewBox="0 0 200 200" id="database">
    <circle cx="100" cy="100" r="50" />
    <g>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">test</div>
      </foreignObject>
    </g>
  </symbol>
);

const BrowserShape = (
  <symbol viewBox="-27 0 154 154" id="browser" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const LambdaShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const TextractShape = (
  <symbol viewBox="-27 -20 154 154" id="textract" width="154" height="124">
    <rect
      transform="translate(0) rotate(0)"
      width="109"
      height="109"
      stroke="#FE8B00"
      strokeWidth="10"
    />
  </symbol>
);

const LoginShape = (
  <symbol
    viewBox="0 0 154 54"
    width="154"
    height="54"
    id="lambda"
    onClick={() => console.log("tim")}
  >
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 90 90" id="emptyEdge">
    <circle cx="45" cy="45" r="26" fill="currentColor" />
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect
      transform="rotate(45)"
      x="21.5"
      y="-14.5"
      width="25"
      height="25"
      fill="currentColor"
    />
  </symbol>
);

const SpecialEdgeShapeReverse = (
  <symbol viewBox="0 0 25 25" id="specialEdgeReverse">
    <rect
      transform="rotate(65)"
      x="17.5"
      y="-27.5"
      width="25"
      height="25"
      fill="#FE8B00"
    />
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge",
      typeText: "Empty"
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: "#specialEdge"
    },
    specialEdgeReverse: {
      shape: SpecialEdgeShapeReverse,
      shapeId: "#specialEdgeReverse"
    }
  },
  NodeTypes: {
    database: {
      shape: DatabaseShape,
      shapeId: "#database",
      typeText: "Database"
    },
    browser: {
      shape: BrowserShape,
      shapeId: "#browser",
      typeText: "Browser"
    },
    server: {
      shape: ServerShape,
      shapeId: "#server",
      typeText: "Server"
    },
    textract: {
      shape: TextractShape,
      shapeId: "#textract",
      typeText: "Textract"
    },
    lambda: {
      shape: LambdaShape,
      shapeId: "#lambda",
      typeText: "Lambda"
    },
    login: {
      shape: LoginShape,
      shapeId: "#login",
      typeText: "Login"
    }
  }
};
