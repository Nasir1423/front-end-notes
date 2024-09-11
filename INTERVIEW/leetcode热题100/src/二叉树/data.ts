import { TreeNode } from "./types";

export const complexTree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 8,
        left: null,
        right: null,
      },
      right: {
        val: 9,
        left: null,
        right: null,
      },
    },
    right: {
      val: 5,
      left: {
        val: 10,
        left: null,
        right: null,
      },
      right: {
        val: 11,
        left: null,
        right: null,
      },
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val: 12,
        left: null,
        right: null,
      },
      right: {
        val: 13,
        left: null,
        right: null,
      },
    },
    right: {
      val: 7,
      left: {
        val: 14,
        left: null,
        right: null,
      },
      right: {
        val: 15,
        left: null,
        right: null,
      },
    },
  },
};

export const symmetricTree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 4,
      left: { val: 5, left: null, right: null },
      right: { val: 6, left: null, right: null },
    },
  },
  right: {
    val: 2,
    left: {
      val: 4,
      left: { val: 6, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 5, left: null, right: null },
      right: { val: 4, left: null, right: null },
    },
  },
};
