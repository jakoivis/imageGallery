// extend(Class, BaseClass);

var extend = function(subClass, baseClass) {
    // any new instance from inheritance (created with new)
    // will have the properties of the baseClass.prototype
    function inheritance() {};
    inheritance.prototype = baseClass.prototype;

    /*
     * any new instance from subClass will have its prototype
     * point to the inheritance instance, which in turn transfers
     * its prototype to the subClass from baseClass.
     * The properties from baseClass will propagate to the subClass, but
     * changes to the subClass or subClass.prototype will not affect the baseClass.
     */
    subClass.prototype = new inheritance();

    // Before this, the subClass.prototype.constructor would point to "function inheritance()"
    // This line changes the subClass constructor back to its original state
    subClass.prototype.constructor = subClass;

    // adding the baseConstructor property to the subClass and setting it to the baseClass
    // enables calling the baseClass from the subClass.
    subClass.baseConstructor = baseClass;

    subClass.superClass = baseClass.prototype;
};