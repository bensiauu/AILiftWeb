export enum RoleTypes {

    
    // Client Role
    INVENTORY_PENDING = 'inventory_pending',

    INVENTORY_LIST = 'inventory_list', //composite role
        INVENTORY_LIST_VIEW = 'inventory_list_view',
        INVENTORY_LIST_UPDATE = 'inventory_list_update',
        INVENTORY_LIST_DELETE = 'inventory_list_delete',
    
    INVENTORY_PLANNING = 'inventory_planning',//composite role
        INVENTORY_PLANNING_VIEW = 'inventory_planning_view',
        INVENTORY_PLANNING_UPDATE = 'inventory_planning_update',
        INVENTORY_PLANNING_CREATE = 'inventory_planning_create',

    INVENTORY_FORECASTING = 'inventory_forecasting',

    //Realm Role
    ADMIN_INVENTORY = 'inventory-demo-realm-admin',
    USER_INVENTORY = 'inventory-demo-realm-user',
    USER_MGMT_INVENTORY = 'inventory-demo-realm-user-management',
    PENDING_INVENTORY = 'inventory-demo-realm-pending',

    // Temp general admin
    ADMIN = "admin"
}